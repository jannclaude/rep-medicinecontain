'use strict'

/**
 * BaseRoute class
 */
class BaseRoute {
    /**
     * Creates an instance of the BaseRoute
     * @param {Object} context - context of the server 
     * @param {Object} server - instance of express
     */
    constructor(context, server) {
        this.context = context;
        this.server = server;
    }

    /**
     * Sets up a new route
     * 
     * @abstract
     */
    setupRoute() {
        throw new Exception('setupRoute must be implemented');
    }
};

module.exports = BaseRoute;