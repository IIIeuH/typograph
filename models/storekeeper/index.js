const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "sent", podstatus: {$exists: false}});
};

module.exports.archive = async() => {
    return await model.passports.find({podstatus: {$exists: true}});
};
