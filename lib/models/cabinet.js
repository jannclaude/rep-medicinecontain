'use strict';

const { BaseModel } = require('../base');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'cabinet';

class CabinetModel extends BaseModel {
    constructor(context) {
        super(context, COLLECTION_NAME);
    }

    async create(cabinet) {
        await this.connect();
        const insertResult = await this.collection.insertOne(cabinet);
        
        if (!insertResult.error) {
            return true;
        }

        return false;
    }

    async get(cabinetId) {
        await this.connect();
        const result = await this.collection.findOne({
            _id : new ObjectId(cabinetId)
        });
        
        if (result && !result.error) {
            return result;
        }

        return undefined;
    }

    async list() {
        await this.connect();
        const result = await this.collection.find().toArray();
        if (!result.error) {
            return result;
        }

        return undefined;
    }

    async update(cabinetId, amount) {
        await this.connect();

        const result = await this.collection.updateOne({
            _id: new ObjectId(cabinetId)
        }, {
            $inc : {
                quantity : parseInt(amount) * -1
            }
        })

        return result;
    }
}

module.exports = CabinetModel;