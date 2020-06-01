const fetch = require('node-fetch');
const Logger = new (require('../advanced/logger').Logger)();

module.exports = {
  name: 'dog',
  aliases: ['doggy', 'dggy'],
  description: 'Get random dog image',
  guildOnly: false,
  args: false,
  usage: '',
  cooldown: 5,
  execute(message, args) {
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => {
          if ( res.ok ) {
            return res.json();
          }
          throw new Error('Request failed!');
        }, networkError => Logger.error(networkError.message))
        .then(jsonRes => {
          message.reply(jsonRes.message);
        })
  }
};
