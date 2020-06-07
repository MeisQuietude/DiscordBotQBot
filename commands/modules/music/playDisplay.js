const { wrapAsQuote } = require("../../../utils");

module.exports = {
    name: "current",
    aliases: ["now"],
    description: "Display info about current track",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    async execute(message, args) {
        const guild = message.guild;

        const playNow = guild.music.currentPlay;

        message.channel.send(wrapAsQuote(`Current track is: ${playNow}`));
    },
};
