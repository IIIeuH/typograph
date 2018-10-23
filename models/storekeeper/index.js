const model = require('../../shema');

module.exports.main = async() => {
    return await model.passports.find({status: "keeper", podstatus: {$exists: false}});
};

module.exports.archive = async() => {
    return await model.passports.find({podstatus: {$exists: true}}, {passOn: 1, inc: 1, customer: 1, price: 1, circulationFiled: 1, passportId: 1, status: 1, typePaper: 1, typePaperSize: 1, typePaperGramm: 1, podstatus: 1, createdAt: 1}).sort({inc: -1});
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id});
};

module.exports.getPapperType = async(table) => {
    return await model[table].find({}).sort({_id: 1});
};

module.exports.getPapers = async() => {
    return await model.stockpapers.find({}).sort({typePaper: -1});
};


module.exports.getOrder = async () => {
    return await model.stockorders.find({status: 'order'}).sort({_id: -1});
};

module.exports.findAll = async (collection) => {
    try{
        return await model[collection].find().sort({_id: -1});
    }catch (err){
        return err;
    }
};

module.exports.capiralizationEdit = async (id) => {
    try{
        return await model.capitalizations.findOne({_id: id});
    }catch (err){
        return err;
    }
};

module.exports.consumptionEdit = async (id) => {
    try{
        return await model.consumptions.findOne({_id: id});
    }catch (err){
        return err;
    }
};

module.exports.getNumber = async (collection) => {
    return await model[collection].findOne({}, {number: 1, _id: 0}).sort({number:-1}).limit(1);
};

module.exports.passportsNoPapers = async () => {
    return model['paperlogs'].find({enough:false}).sort({date:-1});
};

module.exports.getPassport = async (passport) => {
    return model.passports.findOne({passportId: passport}, {_id: 1});
};