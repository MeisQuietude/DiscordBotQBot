const fs = require('fs');
const relative_log_path = './logs/';

module.exports = {
  name: 'log',
  execute(message, file) {
    let d = new Date();
    let date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
    message = `${date} ${time} @MESSAGE:${message}\n`;
    let file_path = `${relative_log_path}${file.trim()}`;
    if (!file_path.endsWith('.txt')) file_path += '.txt';

    fs.writeFile(file_path, message, {flag: 'a+'}, (err) => {
      if ( err ) console.log(err)
    })
  }
};