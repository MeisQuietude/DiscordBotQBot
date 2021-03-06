const fetch = require("node-fetch");
const Logger = new (require("../../../utils").Logger)();

module.exports = {
    name: "cat",
    aliases: ["kit", "kitty"],
    description: "Get random cat image",
    guildOnly: false,
    args: false,
    usage: "",
    cooldown: 5,
    execute(message, args) {
        fetch("https://aws.random.cat/meow") // https://cataas.com/cat
            .then(
                (res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    throw new Error("Request failed!");
                },
                (networkError) => Logger.error(networkError.message)
            )
            .then((jsonRes) => {
                message.reply(jsonRes.file);
            });
    },
};
