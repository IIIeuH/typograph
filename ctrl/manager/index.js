const model = require('../../models/manager');

module.exports.allPassports = async function(req, res){
    let data = await model.getPassports();
    console.log(data);
    res.render('manager/passports', { title: 'Ваши паспорта', data: data });
};

module.exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
};

module.exports.savePassport =  async function(req, res, next) {
    res.redirect('/manager');
};