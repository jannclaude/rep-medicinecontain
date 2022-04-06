'use strict';

const Ajv = require('ajv');
const CabinetController = require('./../controllers/cabinet');
const { BaseRoute } = require('../base');

const schema = require('../schema/cabinet/create');

const ajv = new Ajv();
const validate = ajv.compile(schema);

const DISPENSED_MEDICINE_AMOUNT = 1
class CabinetRoute extends BaseRoute {
    constructor(context, server) {
        super(context, server)
        this.cabinetController = new CabinetController(context);
    }

    setupRoutes() {
        this.server.post('/v1/cabinet/create', this.validate, this.create);
        this.server.get('/v1/cabinet/update/:id', this.update);
        this.server.get('/v1/cabinet/get/:id', this.get);
        this.server.get('/v1/cabinet/list', this.list);
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
        const isCreated = await this.cabinetController.create(req.data.parameters);
        
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

        const result = await this.cabinetController.get(req.params.id);
        
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

    list = async (req, res) => {
        let httpStatusCode = 200;
        const result = await this.cabinetController.list();
        
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

    update = async(req, res) => {
        let httpStatusCode = 200;
        const result = await this.cabinetController.update(req.params.id, DISPENSED_MEDICINE_AMOUNT);

        if (!result) {
            httpStatusCode = 500;
        }

        res.status(httpStatusCode);
        return res.send({
            ok: result !== undefined,
            event: 'update',
            status: httpStatusCode,
            data: result
        });
    }
}

module.exports = CabinetRoute;