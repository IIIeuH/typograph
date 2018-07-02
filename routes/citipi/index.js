const router = require('express').Router();
const ctrl   = require('../../ctrl/citipi');

//start managers

router.get('/', ctrl.main);
router.get('/all', ctrl.all);
router.get('/all/:id', ctrl.allId);
router.get('/:id', ctrl.passport);



//end managers



module.exports = router;