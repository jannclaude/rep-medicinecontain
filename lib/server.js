'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const walker = require('walker');

class Server {
	constructor(localConfig) {
		this.context = localConfig;
		this.server = express();

		this.setupDependencies();
		this.setupRoutes();
	}

	setupDependencies() {
		this.server.use(helmet());
		this.server.use(cors());
		this.server.use(express.urlencoded({
			extended: true
		}));
		this.server.use(express.json());
	}

	setupRoutes() {
		walker('lib/routes/').on('file', (file) => {
			const Route = require('../' + file);
			const route = new Route(this.context, this.server);

			route.setupRoutes();
		});
	}

	start() {
		this.server.listen(this.context.port, () => {
			console.info(`Server started at port ${this.context.port}`);
		});
	}

	quit() {
		this.server.close();
	}
}

module.exports = Server;
