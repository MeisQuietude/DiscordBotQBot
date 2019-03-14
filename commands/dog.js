const fetch = require('node-fetch');

module.exports = {
  name: 'dog',
  aliases: ['doggy'],
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
        }, networkError => log.execute(networkError.message, 'errors'))
        .then(jsonRes => {
          message.reply(jsonRes);
        })

  }
};
