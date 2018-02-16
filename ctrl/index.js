const model     = require('../models/admin/index');
const passport  = require('../models/passport');
const _         = require('lodash');

exports.getCollectionSelect = async (req, res, next) => {
    res.json(await model.searchItem(req.query.collection, req.query.term));
};

exports.checkAuth = (req, res, next) => {
    req.isAuthenticated() ? next()
        : res.redirect('/login');
};

exports.permission = (req, res, next) => {
    const accesses = {
        GET: 1,
        POST: 2,
        PUT: 2,
        DELETE: 3
    };
    const access = accesses[req.method];
    if(req.user.main) return next();
    const permission = _.find(req.user.permissions, {name: req.baseUrl});
    (permission && permission.access >= access) ? next() : next(new Error('У вас нет доступа'));
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

exports.error = (err, req, res, next) => {
    res.status(err.status || 500);
    console.log(123);
    res.render('error', {
        message: err.message,
        error: err,
        user: req.user
    });
};