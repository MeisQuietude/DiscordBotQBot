const fs = require("fs");
const Discord = require("discord.js");

const token = process.env.BOTTOKEN;
const { default_role, prefix } = require("./config.json");

// Change role color to rainbow
// const rainbow = require('./advanced/rainbow');

// Extend Structure
Discord.Structures.extend("Guild", (Guild) => {
    class Music extends Guild {
        constructor(client, data) {
            super(client, data);
            this.music = {
                queue: [],
                isPlaying: false,
                currentPlay: null,
                dispatcher: null,
                connection: null,
                volume: 1,
            };
        }
    }

    return Music;
});

// Advanced utils
const Logger = new (require("./utils").Logger)();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

// Check for *.js files in ./commands/
const commandModules = fs
    .readdirSync("./commands/modules/")
    .filter((module_) =>
        fs.lstatSync(`./commands/modules/${module_}`).isDirectory()
    );

// Set it to Discord.Collection
for (const module of commandModules) {
    const moduleFiles = fs
        .readdirSync(`./commands/modules/${module}`)
        .filter((fileName) => !fileName.startsWith("_"));
    for (const file of moduleFiles) {
        const command = require(`./commands/modules/${module}/${file}`);
        command.module = module;
        client.commands.set(command.name, command);
    }
}

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);

    // const setRoleRainbowColor = new rainbow.Rainbow(client);
    // setRoleRainbowColor.start();
});

client.on("message", (message) => {
    if (
        !message.content.startsWith(prefix) ||
        message.author.bot ||
        message.content.length === 1
    ) {
        return;
    }

    // [PREFIX][COMMAND] [ARGUMENTS]
    const args = message.content.slice(prefix.length).split(/ +/);
    if (!args.length) return;

    const commandName = args.shift().toLowerCase();

    // Find command by name or alias
    const command =
        client.commands.get(commandName) ||
        client.commands.find(
            (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!command) {
        return Logger.error(`Command not exists: ${commandName}`);
    }

    // If we must not use this in DM
    if (command.guildOnly && message.channel.type !== "text") {
        return message.reply("I can't execute that command inside DMs!");
    }

    // If we must enter args, but we didn't
    if (command.args && !args.length) {
        const reply = `Your command would be: \`${prefix}${command.name} ${command.usage}\``;
        return message.reply(reply);
    }

    // Cooldowns
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime =
            timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `please wait ${timeLeft.toFixed(
                    1
                )} more second(s) before reusing the \`${
                    command.name
                }\` command.`
            );
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        Logger.error(error);
        message.reply(
            "There was an error while executing this command, sorry!"
        );
    }
});

client.on("guildMemberAdd", async (member) => {
    const channel = member.guild.channels.find((ch) => ch.name === "welcome");
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
    await member.addRole(
        member.guild.roles.find((role) => role.name === default_role)
    );
});

client.login(token);
