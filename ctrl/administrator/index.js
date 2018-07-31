const model = require('../../models/administrator');


exports.main = async (req, res) => {
    let managers = await model.getManagers();
    res.render('administrator/index', {managers});
};