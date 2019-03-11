const googleParser = require('google-parser');
const logged = require('../logged');

module.exports = {
  name: 'google',
  aliases: ['search', 'find'],
  description: 'Search something by google',
  guildOnly: false,
  args: true,
  usage: '<string>',
  cooldown: 4,
  async execute(message, args) {
    const data = args.join(" ");
    const src = await googleParser.search(data);
    const img = await googleParser.img(data);

    const answer = `**${src[0].title}**\n
                  ${src[0].description}\n
                  ${src[0].link}\n
                  ~~ ${img[0].img} ~~`;

    message.reply(answer);
    logged.execute(`ID@${message.author.id} CONTENT@ ${data}`, 'google');
  }
};
