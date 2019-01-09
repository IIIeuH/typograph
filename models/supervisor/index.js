const model = require('../../shema');

module.exports.getPassports = async () => {
    return await model.passports.find({},{passOn: 1, inc: 1, customer: 1, price: 1, circulationFiled: 1, passportId: 1, status: 1, typePaper: 1, typePaperSize: 1, typePaperGramm: 1, createdAt: 1, date: 1}).sort({createdAt: -1, inc: -1}).limit(20);
};

module.exports.getPassportById = async (id) => {
    return await model.passports.findOne({_id: id});
};