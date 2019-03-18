const {rainbow_role, server_id} = require('../config');

class Rainbow {
  constructor(client) {
    this.client = client;
    this.server = this.client.guilds.get(server_id);
    this.role = this.server.roles.get(rainbow_role);
    this.colors = this.generateColor();
  }

  * generateColor() {
    let i = 0;
    while ( true ) {
      i === 255 ? i = 0 : ++i;
      const red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
      const blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
      const green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

      yield '#' + red + green + blue;
    }

    function sin_to_hex(i, phase) {
      const sin = Math.sin(Math.PI / 255 * 2 * i + phase);
      const int = Math.floor(sin * 127) + 128;
      const hex = int.toString(16);

      return hex.length === 1 ? '0' + hex : hex;
    }
  }

  start() {
    return setInterval(() => {

      const nextColor = this.colors.next().value;
      this.role.setColor(nextColor);

    }, 1)
  }
}

module.exports = {
  Rainbow
};
