const { musicStateUpdate } = require("./_utils");

module.exports = {
    name: "clean",
    aliases: [],
    description: "Clean music queue",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    async execute(message, args) {
        await musicStateUpdate(message.guild, {
            queue: [],
        });
    },
};
