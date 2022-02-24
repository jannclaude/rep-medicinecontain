'use strict';

const Cabinet = require('./../../models/cabinet');

class CabinetCreateController {
    constructor (context) {
        this.context = context;
        this.model = new Cabinet(this.context);
    }

    async create(cabinet) {
        const isCreated = await this.model.create(cabinet);
        return isCreated;
    }
}

module.exports = CabinetCreateController;