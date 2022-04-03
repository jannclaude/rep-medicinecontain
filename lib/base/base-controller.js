/**
 * BaseController route
 */
class BaseController {
    /**
     * Creates an instance of the BaseController
     * @param {Object} context - context of the server
     */
    constructor(context) {
        this.context = context;
    }
}

module.exports = BaseController;