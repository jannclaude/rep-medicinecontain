'use strict'

const { BaseController } = require('../base');
const CabinetModel = require('../models/cabinet');

/**
 * CabinetController class
 */
class CabinetController extends BaseController {
    /**
     * Creates an instance of the CabinetController
     * @param {Object} context - context of the server
     */
    constructor(context) {
        super(context);

        this.cabinetModel = new CabinetModel(this.context);
    }

    async create(cabinet) {
        const isCreated = await this.cabinetModel.create(cabinet);
        return isCreated;
    }

    async get(cabinetId) {
        return await this.cabinetModel.get(cabinetId);
    }

    async list() {
        return await this.cabinetModel.list();
    }

    async update(cabinetId, amount) {
        return await this.cabinetModel.update(cabinetId, amount);
    }
}

module.exports = CabinetController;