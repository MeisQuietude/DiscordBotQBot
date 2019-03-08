module.exports = {
  name: 'help',
  description: 'All available commands',
  execute(message, args) {
    let result = "";

    result += "```css\n";
    Object.keys(cmds).forEach(key => {
      result += `.${key} : ${cmds[key]}\n`;
    });
    result += "```";

    message.channel.send(result);
  }
};

const cmds = {
  prefix: '!',
  ping: 'pong',
  user: 'shows (Username, UserID, UserAvatar) [ !user @mention ]',
  role: 'set/remove (+/-, add/delete) (roles) [ !role set role1 role2 roleN ] [ !role - php ]'
};