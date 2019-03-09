# Developer's guide
## Adding new commands
For creating new bot's power, you need to _create_ the file that **must be** named your full command name.

i.e: 
If I want to create new command `role` (`!role <command> <arguments>`),
I must create file: role.js in ./commands/ directory.

## Dynamic help
You should not write your help-command for your new bot command. Instead of this, you have to use the built-in method.

`<required argument>`
`[optional argument]`


```
  module.exports = {
  name: <name>,                         // your command!
  aliases: [ [alias1, aliasN] ],        // Another names of your command 
  description: <describtion>,           // What is your command
  guildOnly: <bool>,                    // Guild === Server ( false === can't use DM )
  args: <bool>,                         // Must user enter args with your command?
  usage: '[command name]',              // Your command syntax
  cooldown: 5,                          // Cooldown until reuse
  execute(message, args) {              // Your main function
  ***main***
  }
```


in, i.e. `role.js`,
you should have text like:

```  
module.exports = {
  name: 'user',
  aliases: ['usr', 'username'],
  description: 'Username, UserID, UserAvatar',
  guildOnly: false,
  args: true,
  usage: '<@mention>',
  cooldown: 4,
  execute(message, args) {
    message.reply("Your is an user!");
  }
}
```