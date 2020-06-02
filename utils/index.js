const getRandomNumber = require('./modules/getRandomNumber');
const Logger = require('./modules/logger');
// const RainbowRole = require('./modules/rainbow');  MEMORY LEAK

module.exports = {
    Logger,
    getRandomNumber,
}