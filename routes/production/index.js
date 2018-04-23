const router = require('express').Router();
const ctrl   = require('../../ctrl/production');

router.route('/')
    .get(ctrl.main);

router.route('/:id')
    .delete(ctrl.deleteItem);

router.route('/archive')
    .get(ctrl.archive);

router.get('/:id', ctrl.passport);



module.exports = router;