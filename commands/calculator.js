const log = require('../logged');

module.exports = {
  name: 'calculator',
  aliases: ['calculate', 'calc', 'eval'],
  description: 'Calculate expression',
  guildOnly: false,
  args: true,
  usage: '<expression>',
  cooldown: 4,
  execute(message, args) {
    const allowed = '()+-*/0123456789.';
    const expression = args.join("");

    const lg_msg = `ID@${message.author.id} EXPRESSION@${expression}`;
    log.execute(lg_msg, 'calculator');

    if (expression !== expression.split("").filter(sym => allowed.includes(sym)).join("")) {
      return message.reply("You can use only digits and primitive operators");
    }

    try {
      return message.reply(eval(expression))
    } catch (e) {
      return message.reply("Invalid Expression");
    }
  }
};
