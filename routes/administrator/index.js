const router = require('express').Router();
const ctrl   = require('../../ctrl/administrator');

//start administrator

router.get('/', ctrl.main);
router.get('/history', ctrl.history);
router.get('/report', ctrl.report);

module.exports = router;