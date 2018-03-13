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