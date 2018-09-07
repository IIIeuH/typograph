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