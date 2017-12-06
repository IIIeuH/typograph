var express = require('express');
var router = express.Router();
var ctrl = require('../ctrl/admin');

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin/index', {title: 'Admin panel'})
});

router.route('/typepappers')
    .get(ctrl.typePappers)
    .put(ctrl.putPappers);

router.route('/grammpappers')
    .get(ctrl.grammPappers)
    .put(ctrl.putPappers);

module.exports = router;
