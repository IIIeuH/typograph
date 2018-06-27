const model = require('../../models/prepress');

exports.main = async (req, res) => {
    try{
        let data  = await model.main();
        res.render('prepress/index', {title: "Допечатник", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.passport = async (req, res) => {
    try{
        let passport  = await model.passport(req.params.id);
        res.render('prepress/passport', {title: "Допечатник", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};


exports.archive = async (req, res) => {
    try{
        let data  = await model.archive();
        res.render('prepress/archive', {title: "Допечатник", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.lookPassport = async (req, res) => {
    try{
        let passport  = await model.passportLookd(req.params.id);
        res.render('prepress/archiveLook', {title: "Допечатник", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};