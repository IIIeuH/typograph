const router = require('express').Router();
const ctrl   = require('../../ctrl/administrator');

//start administrator

router.get('/', ctrl.main);
router.get('/history', ctrl.history);

module.exports = router;