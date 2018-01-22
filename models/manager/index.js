const model = require('../../shema');

module.exports.savePassport = async (data) => {
    let obj1 = JSON.parse(data.field1);
    let obj2 = JSON.parse(data.field2);
    let saveData = new model.passports(obj1);
    await saveData.save();
    await model.passports.updateOne({passportId: obj1.passportId}, {$set: obj2});
};