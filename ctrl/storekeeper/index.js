const model = require('../../models/storekeeper');

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
        let order = await model.getOrder();
        res.render('storekeeper/papers', {title: "Кладовщик - Склад!", user: req.user, gramm: gramm, size: size, type: type, papers:papers, order:order});
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
        res.render('storekeeper/capitalization', {title: "Кладовщик - Оприходование товара!", user: req.user, gramm: gramm, size: size, type: type});
    }catch(err){
        return err
    }
};