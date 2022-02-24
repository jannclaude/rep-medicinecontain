'use strict';

const CabinetListController = require('../../controllers/cabinet/list');

class CabinetListRoute {
    constructor(context, server) {
        this.context = context;
        this.server = server;
        this.controller = new CabinetListController(this.context);
    }

    setupRoutes() {
        this.server.get('/v1/cabinet/list', this.list);
    }

    list = async (req, res) => {
        let httpStatusCode = 200;
        const result = await this.controller.list();
        
        if (!result) {
            httpStatusCode = 500;
        }

        res.status(httpStatusCode);
        return res.send({
            ok : result !== undefined,
            event : 'read',
            status : httpStatusCode,
            data : result
        });
    }
}

module.exports = CabinetListRoute;