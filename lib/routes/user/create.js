'use strict';

class UserCreateRoute {
    constructor(context, server) {
        this.context = context;
        this.server = server;
    }

    setupRoutes() {
        this.server.post('/v1/user/create', this.validate, this.create);
    }

    validate(req, res, next) {
    }

    create(req, res) {
    }
}

module.exports = UserCreateRoute;