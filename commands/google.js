const googleParser = require('google-parser');

module.exports = {
  name: 'google',
  aliases: ['search', 'find'],
  description: 'Search something by google',
  guildOnly: false,
  args: true,
  usage: '<string>',
  cooldown: 4,
  async execute(message, args) {
    const data = args.join(" ").trim();
    const src = await googleParser.search(data);
    const img = await googleParser.img(data);
    const jpg = await googleParser.jpg(data);

    message.reply(src);
    message.reply(img);
    message.reply(jpg);

    message.reply("======");

    message.reply(src[0]);
    message.reply(img[0]);
    message.reply(jpg[0]);
  }
};
