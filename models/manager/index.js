const model = require('../../shema');

module.exports.getPassports = async (flag, userId) => {
    //if(flag){
    return await model.passports.find().sort({inc: -1});
    //}
    // else{
    //     return await model.passports.find({managerId: userId}).sort({inc: -1});
    // }
};

module.exports.getPassportById = async (id) => {
    return await model.passports.find({_id: id});
};

module.exports.getOrder = async () => {
    return await model.stockorders.find({});
};

module.exports.update = async (collection, query, field) => {
    return await model[collection].update(query, field);
};

module.exports.deleteItem = async (id, collection) => {
    try{
        return await shema[collection].deleteOne({_id: id});
    }catch (err){
        console.log(err);
        return err;
    }
};

