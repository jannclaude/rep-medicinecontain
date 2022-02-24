'use strict';

const { ObjectId } = require('mongodb');
const Cabinet = require('../../models/cabinet');

class CabinetListController {
    constructor (context) {
        this.context = context;
        this.model = new Cabinet(this.context);
    }

    async list() {
        return await this.model.list();
    }
}

module.exports = CabinetListController;