const router = require('express').Router();
const ctrl   = require('../../ctrl/supervisor');

router.get('/', ctrl.main);
router.get('/passport/:id', ctrl.getPassport);



module.exports = router;