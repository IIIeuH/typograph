const express = require('express');
const router = express.Router();
const ctrl = require('../ctrl/admin');

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin/index', {title: 'Admin panel', user: req.user})
});

router.route('/typepappers')
    .get(ctrl.typePappers)
    .put(ctrl.putPappers)
    .delete(ctrl.deleteItem);

router.route('/grammpappers')
    .get(ctrl.grammPappers)
    .put(ctrl.putPappers)
    .delete(ctrl.deleteItem);

router.route('/sizepappers')
    .get(ctrl.sizePappers)
    .put(ctrl.putPappers)
    .delete(ctrl.deleteItem);

router.route('/users')
    .get(ctrl.userList);

router.route('/users/:id')
    .get(ctrl.user)
    .post(ctrl.saveUser);

module.exports = router;
