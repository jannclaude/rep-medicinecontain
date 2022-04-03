const Server = require('./lib/server');
const config = require('./config');

const server = new Server(config);

process.on('SIGTERM', function () {
    if (server !== undefined) {
        server.quit();
    }
})

server.start();
