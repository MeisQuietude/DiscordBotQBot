module.exports = {
  name: 'user',
  description: 'Username, UserID, UserAvatar!',
  execute(message, args) {
    const user = message.mentions.users.first();
    if ( !user ) return;
    message.channel.send(`User: ${user.username}\nID: ${user.id}`);
    message.channel.send(user.avatarURL);
  },
};