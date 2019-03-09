module.exports = {
  name: 'coinflip',
  aliases: ['cf', 'ff'],
  description: 'Simple coinflip: Heads or Tails, Yes or No, This or This',
  guildOnly: false,
  args: false,
  usage: '[[arg1] [arg2]]',
  cooldown: 1,
  execute(message, args) {
    // Default case with no args
    if ( !args.length ) {
      if ( Math.floor(Math.random() * 100) < 50 ) {
        return message.reply("Heads!");
      } else {
        return message.reply("Tails!");
      }
    } else if ( args.includes('or') || args.includes('или') ) {
      const i = args.includes('or') ? args.indexOf('or') : args.indexOf('или');
      const arg1 = args.slice(0, i).join(" ");
      const arg2 = args.slice(i + 1).join(" ");
      if ( !arg1 && !arg2 )
        return message.reply("What?");
      if ( !arg1 )
        return message.reply(arg2);
      if ( !arg2 )
        return message.reply(arg1);

      if ( Math.floor(Math.random() * 100) < 50 ) {
        return message.reply(arg1);
      } else {
        return message.reply(arg2);
      }

    }
    // Case with one argument: yes or no
    else {
      if ( Math.floor(Math.random() * 100) < 50 ) {
        return message.reply("Yes.");
      } else {
        return message.reply("No.");
      }
    }
  }
};