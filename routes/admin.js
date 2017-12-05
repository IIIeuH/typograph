var express = require('express');
var router = express.Router();
var ctrl = require('../ctrl/admin');

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin/index', {title: 'Admin panel'})
});

router.route('/typepapper')
    .get(ctrl.typePappers)
    .put(ctrl.putTypePappers);

router.get('/grammpapper', function(req, res, next) {
    res.render('admin/grammpapper', {title: 'Admin panel'})
});

module.exports = router;
