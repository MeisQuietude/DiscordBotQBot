const { musicStateUpdate } = require("./_utils");

module.exports = {
    name: "pause",
    aliases: [],
    description: "Pause current track",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    async execute(message, args) {
        const guild = message.guild;

        if (guild.music.dispatcher) {
            if (guild.music.isPlaying) {
                guild.music.dispatcher.pause(true);
            } else {
                guild.music.dispatcher.resume();
            }
            await musicStateUpdate(guild, {
                isPlaying: !guild.music.isPlaying,
            });
        }
    },
};
