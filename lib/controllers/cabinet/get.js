'use strict';

const { ObjectId } = require('mongodb');
const Cabinet = require('./../../models/cabinet');

class CabinetGetController {
    constructor (context) {
        this.context = context;
        this.model = new Cabinet(this.context);
    }

    async get(cabinetId) {
        return await this.model.get(new ObjectId(cabinetId));
    }
}

module.exports = CabinetGetController;