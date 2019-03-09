module.exports = {
  name: "random number",
  aliases: ["rand", "r", "random"],
  description: 'get random number',
  guildOnly: false,
  args: false,
  usage: '[<number from> <number to>]',
  cooldown: 1,
  execute(message, args) {
    let min, max;

    if ( !args.length ) {
      min = 0;
      max = 100;
    } else if ( args.length === 1 ) {
      const arg = +args[0];

      if ( arg >= 0 ) {
        min = 0;
        max = arg;
      } else {
        min = arg;
        max = 0;
      }
    } else {
      let arg1 = +args[0];
      let arg2 = +args[1] + 1;

      if (arg1 >= arg2) {
        min = arg2;
        max = arg1;
      } else {
        min = arg1;
        max = arg2;
      }
    }
    return message.reply(Math.floor(Math.random() * (max - min)) + min);
  }
};