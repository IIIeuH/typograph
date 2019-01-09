const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "citipi"}).sort({createdAt: -1, inc: -1});
};

module.exports.all = async() => {
    return await model.passports.find().sort({createdAt: -1, inc: -1});
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id, status: "citipi"});
};

module.exports.allId = async(id) => {
    return await model.passports.findOne({_id: id});
};