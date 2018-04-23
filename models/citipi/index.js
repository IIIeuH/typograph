const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "citipi"});
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id, status: "citipi"});
};