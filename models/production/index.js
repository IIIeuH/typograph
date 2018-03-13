const model = require('../../shema');

module.exports.main = async() => {
  return await model.passports.find({status: {$ne: "new"}});
};

module.exports.archive = async() => {
    return await model.passports.find({status: "sent"});
};

module.exports.deleteItem = async (id, collection) => {
    try{
        return await shema[collection].deleteOne({_id: id});
    }catch (err){
        console.log(err);
        return err;
    }
};