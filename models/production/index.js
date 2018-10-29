const model = require('../../shema');

module.exports.main = async() => {
  return await model.passports.find({status: "production"}).sort({inc: -1});
};

module.exports.archive = async() => {
    return await model.passports.find({status: "success", productionStatus: {$exists: true}});
};

module.exports.passport = async(id) => {
    return await model.passports.findOne({_id: id});
};

module.exports.deleteItem = async (id, collection) => {
    try{
        return await shema[collection].deleteOne({_id: id});
    }catch (err){
        return err;
    }
};