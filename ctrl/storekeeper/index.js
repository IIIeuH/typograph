const model = require('../../models/storekeeper');
const _     = require('lodash');

exports.main = async (req, res) => {
    try{
        let data  = await model.main();
        res.render('storekeeper/index', {title: "Кладовщик", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.archive = async (req, res) => {
    try{
        let data  = await model.archive();
        res.render('storekeeper/archive', {title: "Кладовщик - архив паспортов!", user: req.user, passports: data});
    }catch(err){
        return err
    }
};


exports.passport = async (req, res) => {
    try{
        let passport  = await model.passport(req.params.id);
        res.render('storekeeper/passport', {title: "Кладовщик - паспорт!", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};

exports.paper = async (req, res) => {
    try{
        let gramm = await model.getPapperType('grammpappers');
        let size = await model.getPapperType('sizepappers');
        let type = await model.getPapperType('typepappers');
        let papers = await model.getPapers();
        res.render('storekeeper/papers', {title: "Кладовщик - Склад!", user: req.user, gramm: gramm, size: size, type: type, papers:papers});
    }catch(err){
        return err
    }
};

exports.orderPaper = async (req, res) => {
    try{
        let order = await model.getOrder();
        res.render('storekeeper/orderPaper', {title: "Кладовщик - Склад!", user: req.user, order});
    }catch(err){
        return err
    }
};

exports.typepappers = async (req, res) => {
    try{
        let collection = req.path.slice(1);
        let data = await model.findAll(collection);
        res.render('storekeeper/typepappers', {title: "Кладовщик - тип бумаги!", user: req.user, data: data});
    }catch(err){
        return err
    }
};

exports.grammpappers = async (req, res) => {
    try{
        let collection = req.path.slice(1);
        let data = await model.findAll(collection);
        res.render('storekeeper/grammpappers', {title: "Кладовщик - граммаж бумаги!", user: req.user, data: data});
    }catch(err){
        return err
    }
};

exports.sizepappers = async (req, res) => {
    try{
        let collection = req.path.slice(1);
        let data = await model.findAll(collection);
        res.render('storekeeper/sizepappers', {title: "Кладовщик - размер бумаги!", user: req.user, data: data});
    }catch(err){
        return err
    }
};

exports.capitalization = async (req, res) => {
    try{
        let gramm = await model.getPapperType('grammpappers');
        let size = await model.getPapperType('sizepappers');
        let type = await model.getPapperType('typepappers');
        let number = await model.getNumber('capitalizations');
        res.render('storekeeper/capitalization', {title: "Кладовщик - Оприходование товара!", user: req.user, gramm: gramm, size: size, type: type, number});
    }catch(err){
        return err
    }
};

exports.consumption = async (req, res) => {
    try{
        let gramm = await model.getPapperType('grammpappers');
        let size = await model.getPapperType('sizepappers');
        let type = await model.getPapperType('typepappers');
        let number = await model.getNumber('consumptions');
        res.render('storekeeper/consumption', {title: "Кладовщик - Расход товара!", user: req.user, gramm: gramm, size: size, type: type, number});
    }catch(err){
        return err
    }
};

exports.capitalizationList = async (req, res) => {
    try{
        let capitalization = await model.findAll('capitalizations');
        res.render('storekeeper/capitalization-list', {title: "Кладовщик - приход список!", user: req.user, capitalization: capitalization});
    }catch(err){
        return err
    }
};

exports.consumptionList = async (req, res) => {
    try{
        let consumption = await model.findAll('consumptions');
        res.render('storekeeper/consumption-list', {title: "Кладовщик - расход список!", user: req.user, consumption: consumption});
    }catch(err){
        return err
    }
};

exports.capitalizationEdit = async (req, res) => {
    try{
        let capitalization = await model.capiralizationEdit(req.params.id);
        res.render('storekeeper/capitalization-edit', {title: "Кладовщик - приход просмотр!", user: req.user, capitalization: capitalization});
    }catch(err){
        return err
    }
};

exports.consumptionEdit = async (req, res) => {
    try{
        let consumption = await model.consumptionEdit(req.params.id);
        res.render('storekeeper/consumption-edit', {title: "Кладовщик - расход просмотр!", user: req.user, consumption: consumption});
    }catch(err){
        return err
    }
};

exports.passportsNoPapers = async (req, res) => {
    try{
        let data = await model.passportsNoPapers();
        data = _.chain(data).groupBy("passportId").map(function(v, i) {
            return {
                passportId: i,
                date:  _.get(_.find(v, 'date'), 'date'),
                manager: _.get(_.find(v, 'manager'), 'manager'),
                typePaper: _.map(v, 'typePaper'),
                grammPaper: _.map(v, 'grammPaper'),
                sizePaper: _.map(v, 'sizePaper'),
                count: _.map(v, 'count')
            }
        }).value();
        console.log(data);
        res.render('storekeeper/passportsNoPapers', {title: "Кладовщик - паспорта!", user: req.user, data: data});
    }catch(err){
        return err
    }
};
exports.getPassport = async (req, res) => {
    try{
        let passportId = req.params.passportId;
        let data = await model.getPassport(passportId);
        res.redirect(`/storekeeper/${data._id}`);
    }catch(err){
        return err
    }
};