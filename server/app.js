require('dotenv').config({ path: '../.env' });

const config = require('./config/environment');
const server = require('./server');

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, server.get('env'));
});
