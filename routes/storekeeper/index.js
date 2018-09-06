const router = require('express').Router();
const ctrl   = require('../../ctrl/storekeeper');

router.route('/')
    .get(ctrl.main);

router.route('/archive')
    .get(ctrl.archive);

router.get('/papers', ctrl.paper);

router.get('/:id', ctrl.passport);






module.exports = router;