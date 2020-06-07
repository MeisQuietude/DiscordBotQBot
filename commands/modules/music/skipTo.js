const { musicStateUpdate } = require("./_utils");

module.exports = {
    name: "skipto",
    aliases: ["goto"],
    description: "Skip current track",
    guildOnly: true,
    args: true,
    usage: "<position>",
    cooldown: 4,
    async execute(message, args) {
        let position = args[0];

        const guild = message.guild;

        const queue = guild.music.queue;
        const dispatcher = guild.music.dispatcher;

        if (!queue.length) {
            return message.reply("queue is empty!");
        }

        if (!Number.isInteger(+position)) {
            return message.reply(
                "you have to send position number as argument"
            );
        }
        position = +position;

        if (position <= 0 || position > queue.length) {
            return message.reply(
                `there is no that number of track, possible are 1 to ${queue.length}`
            );
        }

        await musicStateUpdate(guild, {
            queue: queue.slice(position - 1),
        });

        if (dispatcher) {
            await dispatcher.emit("finish");
        }
    },
};
