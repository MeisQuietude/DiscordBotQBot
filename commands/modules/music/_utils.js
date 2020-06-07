const ytdl = require("ytdl-core-discord");
const { wrapAsQuote } = require("../../../utils");

const musicStateUpdate = async (guild, options) => {
    guild.music = {
        ...guild.music,
        ...options,
    };
};

const connectVoiceChannel = async (message) => {
    const guild = message.guild;
    const channel = message.member.voice.channel;

    if (guild.music.connection) {
        return guild.music.connection;
    }

    if (!channel) {
        return message.reply("You are not in a voice channel!");
    }

    if (!channel.joinable || channel.full) {
        return message.reply(
            "i have no permissions to join on a voice channel, or it is full of members"
        );
    }

    const connection = await channel.join();
    message.guild.music.connection = connection;

    return connection;
};

const startPlaying = async (message, playURL) => {
    const guild = message.guild;
    const connection = guild.music.connection;

    if (!connection) {
        throw new Error("no connection provided");
    }

    if (connection.dispatcher) {
        connection.dispatcher.emit("finish");
    }

    const _createDispatcher = async (ytUrl) => {
        const dispatcher = connection.play(
            await ytdl(ytUrl, {
                quality: "highestaudio",
                highWaterMark: 1024 * 1024 * 10,
                filter: "audioonly",
            }),
            { type: "opus" }
        );

        dispatcher.on("start", async () => {
            await musicStateUpdate(guild, {
                dispatcher,
                isPlaying: true,
                currentPlay: playURL,
            });
            message.channel.send(wrapAsQuote(`Current playing: ${playURL}`)); // TODO: One static channel
        });

        dispatcher.on("finish", async () => {
            if (guild.music.queue.length === 0) {
                await musicStateUpdate(guild, {
                    dispatcher: null,
                    isPlaying: false,
                    currentPlay: null,
                });
                connection.disconnect();
            } else {
                const next = guild.music.queue.shift();
                const newDispatcher = _createDispatcher(next);
                await musicStateUpdate(guild, {
                    dispatcher: newDispatcher,
                    isPlaying: true,
                    currentPlay: next,
                });
            }
        });

        dispatcher.on("error", async () => {
            // TODO: Log error
            await musicStateUpdate(guild, {
                dispatcher: null,
                isPlaying: false,
                currentPlay: null,
            });
        });
    };

    await _createDispatcher(playURL);

    return guild.music.dispatcher;
};

module.exports = {
    connectVoiceChannel,
    startPlaying,
    musicStateUpdate,
};
