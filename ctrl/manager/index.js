const model = require('../../models/manager');


exports.main = (req, res) => {
    res.render('manager/index', {title: "manager", user: req.user});
};

exports.allPassports = async function(req, res){
    let data = await model.getPassports();
    res.render('manager/passports', { title: 'Ваши паспорта', data: data });
};

exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
};

exports.savePassport =  async function(req, res, next) {
    res.redirect('/manager');
};

exports.getPassport =  async function(req, res, next) {
    let data = await model.getPassportById(req.params.id);
    res.render('manager/onePassport', { title: 'Паспорт', passport: data[0] });
};
