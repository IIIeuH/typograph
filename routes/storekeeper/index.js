const router = require('express').Router();
const ctrl   = require('../../ctrl/storekeeper');

router.route('/')
    .get(ctrl.main);

router.route('/archive')
    .get(ctrl.archive);

module.exports = router;