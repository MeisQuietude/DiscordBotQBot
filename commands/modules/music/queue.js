const { wrapAsQuote } = require("../../../utils");

module.exports = {
    name: "queue",
    aliases: ["q"],
    description: "Show music queue",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    execute(message, args) {
        const guild = message.guild;

        const currentPlay = guild.music.currentPlay;
        const queue = guild.music.queue;

        let replyMessage = "";

        if (currentPlay) {
            replyMessage += `Current playing: ${currentPlay}\n\n`;
        }
        if (!queue.length) {
            replyMessage += "Queue is empty!";
        } else {
            const q_ = queue.map((url, i) => `${i + 1}. ${url}`);
            replyMessage += "Queue:\n" + q_.join("\n");
        }

        message.channel.send(wrapAsQuote(replyMessage)); // TODO: One static channel
    },
};
