module.exports = {
  name: 'user',
  aliases: ['usr', 'username'],
  description: 'Username, UserID, UserAvatar',
  guildOnly: false,
  args: true,
  usage: '<@mention>',
  cooldown: 4,
  execute(message, args) {
    const user = message.mentions.users.first();
    if ( !user ) return;
    message.channel.send(`User: ${user.username}\nID: ${user.id}`);
    message.channel.send(user.avatarURL);
  },
};