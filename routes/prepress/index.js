const router = require('express').Router();
const ctrl   = require('../../ctrl/prepress');

//start managers

router.get('/', ctrl.main);
router.get('/:id', ctrl.passport);



//end managers



module.exports = router;