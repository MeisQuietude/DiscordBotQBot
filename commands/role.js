const log = require('../advanced/logged');
const guild = require("discord.js");
const allowedRoles = [
  ('python', 'Python'),
  ('django', 'Django'),
  ('flask', 'Flask'),
  ('tornado', 'Tornado'),
  
  ('java', 'Java'),
  
  ('js', 'JavaScript'),
  ('nodejs', 'NodeJS'),
  ('vue', 'Vue'),
  ('react', 'React'),
  ('angular', 'Angular'),
  
  ('php', 'PHP'),
  
  ('c', 'C'),
  ('cpp', 'C++'),
  ('csharp', 'C#'),
];

const isRoleAllowed = role => {
  for (let r in allowedRoles) {
    if (r[0] == role) return true;
  }
  return false;
}

module.exports = {
  name: 'role',
  aliases: ['roles'],
  description: 'configure roles of user',
  guildOnly: true,
  args: true,
  usage: '<action> <roles>      || <action> could be [+/-, add/rm]',
  positive_action: '+, add',
  negative_action: '-, rm',
  cooldown: 2,
  async execute(message, args) {
    if ( args.length < 2 ) {
      return message.reply("Need an action (add or rm) and at least one role: [add/rm] [...roles]");
    }

    const action = args[0].toLowerCase();
    const enteredRoles = args.slice(1).map(r => r.toLowerCase());

    let validRoles = [];
    let invalidRoles = [];

    for (let role in enteredRoles) {
      let array = (isRoleAllowed(role)) ? validRoles : invalidRoles; 
      array.push(role);
    }

    switch (action) {
      case '+':
      case 'add': {
        validRoles.forEach(async role_name => {
          let role = await message.guild.roles.find(r => r.name === role_name);
          message.member.addRole(role);
        });

        let reply = ``;
        if ( validRoles.length ) {
          reply += `\nyour new roles: ${validRoles.join(", ")}`;
        }
        if ( invalidRoles.length ) {
          reply += `\ninvalid roles: ${invalidRoles.join(", ")}`;
        }
        message.reply(reply);
        
        break;
      }
      case '-':
      case 'rm': {
        validRoles.forEach(async role_name => {
          let role = await message.guild.roles.find(r => r.name === role_name);
          message.member.removeRole(role);
        });

        let reply = ``;
        if ( validRoles.length ) {
          reply += `removed roles: ${validRoles.join(", ")}`;
        }
        if ( invalidRoles.length ) {
          reply += `\nInvalid roles: ${invalidRoles.join(", ")}`;
        }
        message.reply(reply);

        break;
      }
    }

    log.execute(`${message.member.user.username} ${message.member.user.id}, role ${args[0]} ${enteredRoles}`, 'role');
  }
};