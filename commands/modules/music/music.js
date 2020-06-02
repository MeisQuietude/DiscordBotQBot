const ytdl = require("ytdl-core-discord");

module.exports = {
    name: "music",
    aliases: ["play", "p"],
    description: "Play music as audio from YouTube",
    guildOnly: true,
    args: true,
    usage: "<YouTube URL>",
    cooldown: 4,
    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You are not in a voice channel!");
        }

        const url = args[0]; // TODO: validate url

        const connection = await message.member.voice.channel.join();
        const dispatcher = connection.play(
            await ytdl(url, {
                quality: "highestaudio",
                highWaterMark: 1024 * 1024 * 10,
                filter: "audioonly",
            }),
            { type: "opus" }
        );

        dispatcher.on("start", () => {
            null;
        });

        dispatcher.on("finish", () => {
            message.member.voice.channel.leave();
        });

        dispatcher.on("error", (error) => {
            console.error(error);
        });
    },
};
