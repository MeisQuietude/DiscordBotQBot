const fs = require('fs');
const relative_log_path = './logs/';
const path = require('path');
const moment = require('moment');

const pathToLogs = './logs/';
const FILES = {
  ERROR: path.join(pathToLogs, "errors.txt"),
  ACTIONS: path.join(pathToLogs, "actions.txt")
}

class Logger {
  constructor() {
    if (!fs.existsSync(pathToLogs)) {
      fs.mkdirSync(pathToLogs);
    };

    Object.values(FILES).forEach(path_ => {
      if (!fs.existsSync(path_)) {
        fs.openSync(path_, 'w+');
      }
    });
  }

  _getPrefix() {
    return `[${moment().utc().format()}]`;
  }

  async error(message) {
    const path_ = FILES.ERROR;
    const result_message = `${this._getPrefix()} ${message}\r\n`;

    await fs.appendFile(path_, result_message, (err) => {
      if ( err ) console.log(err);
    })
  }
  
  async action(message) {
    const path_ = FILES.ACTIONS;
    const result_message = `${this._getPrefix()} ${message}\r\n`;
    
    await fs.appendFile(path_, result_message, (err) => {
      if ( err ) console.log(err);
    })
  }
}

module.exports = {
  Logger
};