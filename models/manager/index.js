const model = require('../../shema');

module.exports.getPassports = async () => {
   return await model.passports.find();
};

