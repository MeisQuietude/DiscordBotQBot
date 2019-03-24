const serverID = '552895618507341844';
const channelID = '555104717529677828';

const timeInMilliseconds = 1000 * 60 * 60 * 5;  // 5 hours

module.exports = {
  uprate(client) {
    client.channels.get(channelID).send('S.UP');
  },
  timeInMilliseconds
};