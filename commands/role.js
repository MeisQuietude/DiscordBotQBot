const log = require('../logged');
const guild = require("discord.js");
const available_roles = [
  'Python', 'Django', 'Flask', 'Tornado',
  'Java',
  'Base Web',
  'JavaScript', 'Vue', 'React', 'Angular', 'Backbone',
  'PHP',
  'C#', 'Unity',
  'C++',
  'C'
];

module.exports = {
  name: 'role',
  aliases: ['roles'],
  description: 'add new role to this user',
  guildOnly: true,
  args: true,
  usage: '<action> <roles>      || <action> could be [+/-, set/del, add/rm]',
  positive_action: '+, set, add, new',
  negative_action: '-, rm, del, remove',
  cooldown: 2,
  async execute(message, args) {
    if ( args.length < 2 ) {
      message.reply("Need at least action (set or remove) and 1 role: [set/remove] [...roles]");
      return;
    }

    let enteredRoles = args.slice(1);
    let areValidRoles = [];
    let incorrectEnteredRoles = [];

    await enteredRoles.forEach(role => {
      let found = false;
      available_roles.forEach(av_role => {
        if ( role.toLowerCase() === av_role.toLowerCase() ) {
          areValidRoles.push(av_role);
          found = true;
        }
      });
      if ( !found ) {
        incorrectEnteredRoles.push(role);
      }
    });

    switch (args[0].toLowerCase()) {
      case '+':
      case 'new':
      case 'add':
      case 'set': {
        areValidRoles.forEach(async text_role => {
          let role = message.guild.roles.find(r => r.name === text_role);
          await message.member.addRole(role);
        });

        let reply = ``;
        if ( areValidRoles.length ) {
          reply += `\nyour new roles: ${areValidRoles.join(", ")}`;
        }
        if ( incorrectEnteredRoles.length ) {
          reply += `\ninvalid roles: ${incorrectEnteredRoles.join(", ")}`;
        }
        message.reply(reply);
        break;
      }
      case '-':
      case 'rm':
      case 'del':
      case 'delete':
      case 'remove': {
        areValidRoles.forEach(async text_role => {
          let role = message.guild.roles.find(r => r.name === text_role);
          await message.member.removeRole(role);
        });

        let reply = ``;
        if ( areValidRoles.length ) {
          reply += `removed roles: ${areValidRoles.join(", ")}`;
        }
        if ( incorrectEnteredRoles.length ) {
          reply += `\nInvalid roles: ${incorrectEnteredRoles.join(", ")}`;
        }
        message.reply(reply);

        break;
      }
    }

    log.execute(`${message.member.user.username} ${message.member.user.id}, role ${args[0]} ${enteredRoles}`, 'role');
  }
};