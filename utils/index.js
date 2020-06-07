const getRandomNumber = require("./modules/getRandomNumber");
const Logger = require("./modules/logger");
// const RainbowRole = require('./modules/rainbow');  MEMORY LEAK
const { wrapAsQuote } = require("./modules/wrapText");

module.exports = {
    Logger,
    getRandomNumber,
    wrapAsQuote,
};
