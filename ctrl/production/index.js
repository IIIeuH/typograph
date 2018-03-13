const model = require('../../models/production');

exports.main = async (req, res) => {
    try{
        let data  = await model.main();
        res.render('production/index', {title: "production", user: req.user, passports: data});
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

exports.deleteItem = async (req, res, next) => {
    console.log(req.body.id);
    res.json(await model.deleteItem(req.body.id, 'passports'));
};