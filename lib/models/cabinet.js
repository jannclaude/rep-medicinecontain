'use strict';

const { MongoClient } = require('mongodb');
const COLLECTION_NAME = 'cabinet';

class CabinetModel {
    constructor(context) {
        this.context = context;
        this.cabinetMongoClient = new MongoClient(this.context.connectionString);
        
    }

    async connect() {
        await this.cabinetMongoClient.connect();
        const db = this.cabinetMongoClient.db(this.context.dbName);
        this.collection = db.collection(COLLECTION_NAME);
    }

    async close() {
        await this.cabinetMongoClient.close();
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
            _id : cabinetId
        });
        
        console.log(result)
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
}

module.exports = CabinetModel;