const model = require('../../models/administrator');


exports.main = async (req, res) => {
    let managers = await model.getManagers();
    res.render('administrator/index', {managers});
};

exports.history = async (req, res) => {
    let passports = await model.getPassports();
    res.render('administrator/history', {passports});
};
exports.report = async (req, res) => {
    let managers = await model.getManagers();
    res.render('administrator/report', {managers});
};