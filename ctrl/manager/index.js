const model = require('../../models/manager');

module.exports.allPassports = async function(req, res){
    let data = await model.getPassports();
    res.render('manager/passports', { title: 'Ваши паспорта', data: data });
};

module.exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
};

module.exports.savePassport =  async function(req, res, next) {
    res.redirect('/manager');
};

module.exports.getPassport =  async function(req, res, next) {
    let data = await model.getPassportById(req.params.id);
    res.render('manager/onePassport', { title: 'Паспорт', passport: data[0] });
};
