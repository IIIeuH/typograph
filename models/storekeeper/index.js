const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "keeper", podstatus: {$exists: false}});
};

module.exports.archive = async() => {
    return await model.passports.find({podstatus: {$exists: true}});
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id});
};

module.exports.getPapperType = async(table) => {
    return await model[table].find({});
};

module.exports.getPapers = async() => {
    return await model.stockpapers.find({});
};