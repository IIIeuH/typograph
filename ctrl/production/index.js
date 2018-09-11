const model = require('../../models/production');

exports.main = async (req, res) => {
    try{
        let data  = await model.main();
        res.render('production/index', {title: "Производство", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.archive = async (req, res) => {
    try{
        let data  = await model.archive();
        res.render('production/archive', {title: "Архив паспартов", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.passport = async (req, res) => {
    try{
        let passport  = await model.passport(req.params.id);
        res.render('production/passport', {title: "Производство - паспорт!", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};

exports.deleteItem = async (req, res, next) => {
    res.json(await model.deleteItem(req.body.id, 'passports'));
};