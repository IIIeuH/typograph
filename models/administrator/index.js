const model = require('../../shema');

module.exports.getManagers = async () => {
    return await model.users.find({role: 'manager'}, {name: 1});
};