'use strict'

const { MongoClient } = require('mongodb');

/**
 * BaseModel class
 */
class BaseModel {
    /**
     * Creates an instance of the BaseModel
     * @param {Object} context - context of the server 
     * @param {string} collectionName - name of the collection
     */
    constructor(context, collectionName) {
        this.context = context;
        this.collectionName = collectionName
        this.mongodbClient = new MongoClient(this.context.mongodb.connectionString);
    }

    /**
     * Connects the client to the database
     */
    async connect() {
        if (this.state === 'connected') {
            return;
        }

        this.connection = await this.mongodbClient.connect();
        const db = this.mongodbClient.db(this.context.mongodb.dbName);
        this.collection = db.collection(this.collectionName);
    }
};

module.exports = BaseModel;