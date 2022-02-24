'use strict';

const Ajv = require('ajv');
const CabinetCreateController = require('./../../controllers/cabinet/create');

const schema = require('../../schema/cabinet/create');

const ajv = new Ajv();

const validate = ajv.compile(schema);

class CabinetCreateRoute {
    constructor(context, server) {
        this.context = context;
        this.server = server;
        this.controller = new CabinetCreateController(this.context);
    }

    setupRoutes() {
        this.server.post('/v1/cabinet/create', this.validate, this.create);
    }

    validate(req, res, next) {
        req.data = {
            parameters : {
                name : req.body.name,
                medicine : req.body.medicine,
                quantity : req.body.quantity
            }
        };

        if (!validate(req.data.parameters)) {
            res.status(422);
            return res.send(validate.errors[0]);
        }

        next();
    }

    create = async (req, res) => {
        let httpStatusCode = 200;
        const isCreated = await this.controller.create(req.data.parameters);
        
        if (!isCreated) {
            httpStatusCode = 500;
        }

        res.status(httpStatusCode);
        return res.send({
            ok : isCreated,
            event : 'create',
            status : httpStatusCode,
            data : req.data.parameters
        });
    }
}

module.exports = CabinetCreateRoute;