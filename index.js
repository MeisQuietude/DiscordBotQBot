const {token, default_role, prefix} = require('./config.json');
const log = require('./logged');

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

// Check for *.js files in ./commands/
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Set it to Discord.Collection
for ( const file of commandFiles ) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if ( !message.content.startsWith(prefix) || message.author.bot || message.content.length === 1 ) return;

  // [PREFIX][COMMAND] [ARGUMENTS]
  const args = message.content.slice(prefix.length).split(/ +/);
  if ( !args.length ) return;

  const commandName = args.shift().toLowerCase();
  if ( !client.commands.has(commandName) ) return;
  const command = client.commands.get(commandName);

    try {
      command.execute(message, args);
    } catch (error) {
      console.error(error);
      console.log(`Unknown command: ${commandName}`);
      message.reply('there is no that command!');
    }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'welcome');
  if ( !channel ) return;
  channel.send(`Welcome to the server, ${member}`);
  member.addRole(member.guild.roles.find(role => role.name === default_role));
  log.execute(`${member} ${member.user.id}`)
});

client.login(token);