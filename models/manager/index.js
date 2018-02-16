const model = require('../../shema');

module.exports.getPassports = async (flag, userId) => {
    if(flag){
        return await model.passports.find();
    }else{
        return await model.passports.find({managerId: userId});
    }
};

module.exports.getPassportById = async (id) => {
    return await model.passports.find({_id: id});
};

module.exports.update = async (collection, query, field) => {
    return await model[collection].update(query, field);
};

