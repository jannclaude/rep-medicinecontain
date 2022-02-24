'use strict';

const CabinetGetController = require('./../../controllers/cabinet/get');

class CabinetGetRoute {
    constructor(context, server) {
        this.context = context;
        this.server = server;
        this.controller = new CabinetGetController(this.context);
    }

    setupRoutes() {
        this.server.get('/v1/cabinet/get/:id', this.get);
    }

    get = async (req, res) => {
        let httpStatusCode = 200;

        if (req.params.id === undefined) {
            return res.send({
                ok : false,
                event : 'read',
                status : 422,
                data : {
                    id : req.params.id
                }
            });
        }

        const result = await this.controller.get(req.params.id);
        
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

module.exports = CabinetGetRoute;