module.exports = {
    type : 'object',
    properties : {
        name : {
            type : 'string',
            description : 'Name of the cabinet'
        },
        medicine : {
            type : 'string',
            description : 'Name of the medicine'
        },
        quantity : {
            type : 'number',
            description : 'Initial quantity of the medicine'
        }
    },
    required : [
        'name'
    ],
    additionalProperties : false
};