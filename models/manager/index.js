const model = require('../../shema');

module.exports.getPassports = async () => {
   return await model.passports.find();
};

module.exports.getPassportById = async (id) => {
    return await model.passports.find({_id: id});
};

