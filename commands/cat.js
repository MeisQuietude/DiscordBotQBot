const fetch = require('node-fetch');
const log = require('../logged');

module.exports = {
  name: 'cat',
  aliases: ['kit', 'kitty'],
  description: 'Get random cat image',
  guildOnly: false,
  args: false,
  usage: '',
  cooldown: 5,
  execute(message, args) {
    fetch('https://aws.random.cat/meow')  // https://cataas.com/cat
        .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Request failed!');
    }, networkError => log.execute(networkError.message, 'errors'))
        .then(jsonRes => {
          message.reply(jsonRes);
        })
  }
};
