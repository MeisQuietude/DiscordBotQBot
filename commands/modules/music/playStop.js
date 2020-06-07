const commandClean = require("./queueClean");

module.exports = {
    name: "stop",
    aliases: [],
    description: "Stop music with clean queue",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    async execute(message, args) {
        const guild = message.guild;

        await commandClean.execute(message, args);
        if (guild.music.dispatcher) {
            await guild.music.dispatcher.emit("finish");
        }
    },
};
