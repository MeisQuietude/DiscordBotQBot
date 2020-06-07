const getRandomNumber = require("../../../utils").getRandomNumber;

module.exports = {
    name: "coinflip",
    aliases: ["cf", "ff"],
    description: "Simple coinflip: Heads or Tails, Yes or No, This or This",
    guildOnly: false,
    args: false,
    usage: "[[arg1] [arg2]]",
    cooldown: 1,
    execute(message, args) {
        if (!args.length) {
            // Heads or Tails
            return message.reply(getRandomNumber(0, 1) ? "Heads!" : "Tails!");
        } else if (args.length === 1) {
            // Yes or No
            return message.reply(getRandomNumber(0, 1) ? "Yes!" : "No!");
        } else {
            // Multiple choice
            const min = 0;
            const max = --args.length;

            const index = getRandomNumber(min, max);

            return message.reply(args[index]);
        }
    },
};
