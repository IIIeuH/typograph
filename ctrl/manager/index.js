const model = require('../../models/manager');
const _     = require('lodash');


exports.main = (req, res) => {
    if(req.user.name === 'Anonymous'){
        res.redirect('manager/profile');
    }else{
        res.cookie('manager', '');
        res.cookie('manager', req.user.name);
        res.render('manager/index', {title: "manager", user: req.user});
    }

};



exports.profile = (req, res) => {
    res.render('manager/profile', {title: "Профиль", user: req.user, msg: req.flash('success')});
};

exports.saveProfile = async (req, res) => {
    let query = {
      _id: req.user._id
    };
    let field = req.body;
    await model.update('users', query, field);
    res.json({success: "Сохранено!"});
};

exports.allPassports = async function(req, res){
    let main = req.user.main || false;
    let userId = req.user._id;
    let data = await model.getPassports(main, userId);
    res.render('manager/passports', { title: 'Ваши паспорта', data: data ,user: req.user});
};

exports.deleteItem = async (req, res, next) => {
    res.json(await model.deleteItem(req.body.id, 'passports'));
};

exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form', user: req.user});
};

// exports.savePassport =  async function(req, res, next) {
//     res.redirect('/manager/allpassport');
// };

exports.getPassport =  async function(req, res, next) {
    let data = await model.getPassportById(req.params.id);
    res.render('manager/onePassport', { title: 'Паспорт', passport: data[0],user: req.user});
};

exports.orderPapers =  async function(req, res, next) {
    let order = await model.getOrder();
    let getOrder = await model.getOrderManager(req.user.name);
    res.render('manager/orderpapers', { title: 'Паспорт', order:order, getOrder:getOrder});
};

exports.stockOrders =  async function(req, res, next) {
    let papers = await model.getPapers();
    let sortNamePaper = _.orderBy(papers, ['typePaper', 'grammPaper'], ['desc', 'asc']);
    res.render('manager/stockOrders', { title: 'Склад бумаги', papers:sortNamePaper});
};
