const model = require('../../models/citipi');

exports.main = async (req, res) => {
    try{
        let data  = await model.main();
        res.render('citipi/index', {title: "СиТиПи", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.all = async (req, res) => {
    try{
        let data  = await model.all();
        res.render('citipi/all', {title: "СиТиПи", user: req.user, passports: data});
    }catch(err){
        return err
    }
};

exports.allId = async (req, res) => {
    try{
        let passport  = await model.allId(req.params.id);
        res.render('citipi/allId', {title: "СиТиПи", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};

exports.passport = async (req, res) => {
    try{
        let passport  = await model.passport(req.params.id);
        res.render('citipi/passport', {title: "СиТиПи", user: req.user, passport: passport});
    }catch(err){
        return err
    }
};
