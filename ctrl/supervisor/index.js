const model = require('../../models/supervisor');


exports.main = async (req, res) => {
    let data = await model.getPassports();
    res.render('supervisor/index', {title: "Начальник смены", user: req.user, data:data});
};

exports.getPassport =  async function(req, res, next) {
    let data = await model.getPassportById(req.params.id);
    res.render('supervisor/onePassport', { title: 'Паспорт', passport: data,user: req.user});
};