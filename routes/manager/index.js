const router = require('express').Router();
const ctrl   = require('../../ctrl/manager');

//start managers

router.get('/', ctrl.main);
router.route('/profile')
    .get(ctrl.profile)
    .post(ctrl.saveProfile);
router.get('/allpassport', ctrl.allPassports);
router.get('/passport', ctrl.renderPassport);
router.get('/passport/:id', ctrl.getPassport);
router.post('/passport', ctrl.savePassport);



//end managers



module.exports = router;