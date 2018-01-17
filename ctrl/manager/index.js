const model = require('../../models/manager');


module.exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
};

module.exports.savePassport =  async function(req, res, next) {
    let ans = await model.savePassport(req.body);
    res.json(ans);
};