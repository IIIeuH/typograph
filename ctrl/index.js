const model = require('../models/admin/index');
const passport = require('../models/passport');

exports.getCollectionSelect = async (req, res, next) => {
    res.json(await model.searchItem(req.query.collection, req.query.term));
};

exports.checkAuth = (req, res, next) => {
    req.isAuthenticated() ? next()
        : res.redirect('/login');
};


exports.role = (req, res, next) => {
    if(req.user.role === 'manager' && req.user.main === false){
        res.redirect(301, '/manager');
        next();
    }
    if(req.user.main){
        next();
    }
};

exports.login = (req, res) => {
    if(req.user){
        res.redirect('back');
    }
    res.render('login', { title: 'login' , message: req.flash('message')});
};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/login');
};

exports.auth = passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

exports.registration = passport.authenticate('registration', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});