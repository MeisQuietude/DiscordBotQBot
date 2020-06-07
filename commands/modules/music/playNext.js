const { connectVoiceChannel, startPlaying } = require("./_utils");

module.exports = {
    name: "playnext",
    aliases: ["next"],
    description: "Play music after current",
    guildOnly: true,
    args: true,
    usage: "<YouTube URL>",
    cooldown: 4,
    async execute(message, args) {
        const guild = message.guild;
        const url = args[0]; // TODO: validate url

        await connectVoiceChannel(message).catch(console.error);

        if (!guild.music.currentPlay) {
            await startPlaying(message, url).catch(console.error);
        } else {
            guild.music.queue.unshift(url);
        }
    },
};
