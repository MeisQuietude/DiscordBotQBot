import { getRandomNumber } from '../utils/utils';

module.exports = {
  name: "random number",
  aliases: ["rand", "r", "random"],
  description: 'get random number',
  guildOnly: false,
  args: false,
  usage: '[<number from> <number to>]',
  cooldown: 1,
  execute(message, args) {
    let min, max; // included

    if ( !args.length ) {
      min = 0;
      max = 100;
    } else if ( args.length === 1 ) {
      min = 0;
      max = +args[0];
    } else if ( args.length === 2 ) {
      min = +args[0];
      max = +args[1];
    } else {
      return message.reply("Too many arguments...")
    }

    return message.reply(getRandomNumber(min, max));
  }
};