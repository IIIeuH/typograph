const model = require('../../shema');
const moment = require('moment');

module.exports.getPassports = async (flag, userId) => {
    //if(flag){
    return await model.passports.find({},{passOn: 1, inc: 1, customer: 1, price: 1, circulationFiled: 1, passportId: 1, status: 1, typePaper: 1, typePaperSize: 1, typePaperGramm: 1, createdAt: 1, date: 1}).sort({inc: -1}).limit(20);
    //}
    // else{
    //     return await model.passports.find({managerId: userId}).sort({inc: -1});
    // }
};

module.exports.getPassportById = async (id) => {
    return await model.passports.find({_id: id});
};

module.exports.getOrder = async () => {
    return await model.stockorders.find({status: {$ne: 'await'}});
};

module.exports.getOrderManager = async (user) => {
    let startDate = moment(new Date(), "YYYY-MM-DD").startOf('day').format("YYYY-MM-DD HH:mm:ss");
    let endDate = moment(new Date(), "YYYY-MM-DD").endOf('day').format("YYYY-MM-DD HH:mm:ss");
    return await model.stockorders.findOne({$and: [{date:  {$gte: new Date(startDate)}}, {date: {$lte: new Date(endDate)}}], status: 'await', person: user}).sort({_id: -1});
};

module.exports.update = async (collection, query, field) => {
    return await model[collection].update(query, field);
};

module.exports.deleteItem = async (id, collection) => {
    try{
        return await shema[collection].deleteOne({_id: id});
    }catch (err){
        return err;
    }
};


module.exports.getPapers = async() => {
    return await model.stockpapers.find({});
};
