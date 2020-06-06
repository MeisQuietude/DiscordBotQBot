module.exports = {
    name: "skip",
    aliases: [],
    description: "Skip current track",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    async execute(message, args) {
        const guild = message.guild;
        const dispatcher = guild.music.dispatcher;

        if (dispatcher) {
            await dispatcher.emit("finish");
        }
    },
};
