const router = require('express').Router();
const ctrl   = require('../../ctrl/administrator');

//start administrator

router.get('/', ctrl.main);

module.exports = router;