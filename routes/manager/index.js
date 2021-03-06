const router = require('express').Router();
const ctrl   = require('../../ctrl/manager');

//start managers

router.get('/', ctrl.main);
router.route('/profile')
    .get(ctrl.profile)
    .post(ctrl.saveProfile);
router.route('/allpassport')
    .get(ctrl.allPassports)
    .delete(ctrl.deleteItem);
router.get('/passport', ctrl.renderPassport);
router.get('/passport/:id', ctrl.getPassport);
router.get('/orderpapers', ctrl.orderPapers);
router.get('/stockorders', ctrl.stockOrders);
//router.post('/passport', ctrl.savePassport);



//end managers



module.exports = router;