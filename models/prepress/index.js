const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "prepress"}).sort([['_id', -1]]);
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id, status: "prepress"});
};

module.exports.archive = async() => {
    return await model.passports.find({$and: [{status: {$ne: "prepress"}}, {status: {$ne: "new"}}]}).sort({inc: -1});
};

module.exports.passportLookd = async(id) => {
    return await model.passports.findOne({_id: id});
};