const commandQueue = require("./queue");

const shuffle = (array) => {
    /* Fisher–Yates Shuffle
     * https://bost.ocks.org/mike/shuffle/
     */
    let m = array.length,
        t,
        i;

    // While there remain elements to shuffle…
    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
};

module.exports = {
    name: "shuffle",
    aliases: [],
    description: "Shuffle music queue",
    guildOnly: true,
    args: false,
    usage: "",
    cooldown: 4,
    execute(message, args) {
        const queue = message.guild.music.queue;

        shuffle(queue);

        commandQueue.execute(message, args);
    },
};
