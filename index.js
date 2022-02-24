const Server = require('./lib/server');
const server = new Server();

process.on('SIGTERM', function () {
    if (server !== undefined) {
        server.quit();
    }
})

server.start();
