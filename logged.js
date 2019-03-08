const {logs} = require('./config.json');
const fs = require('fs');

module.exports = {
  name: 'log',
  execute(message, file) {
    let d = new Date();
    let date = `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`;
    let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    message = `${date}, ${time}; ${message}\n`;
    fs.writeFile(logs[file], message, {flag: 'a+'}, (err) => {
      if ( err ) console.log(err)
    })
  }
};