const router = require('express').Router();
const ctrl   = require('../../ctrl/manager');

//start managers
router.get('/', ctrl.allPassports);
router.get('/passport', ctrl.renderPassport);
router.post('/passport', ctrl.savePassport);


//end managers



module.exports = router;