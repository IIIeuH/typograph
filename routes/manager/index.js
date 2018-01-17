const router = require('express').Router();
const ctrl   = require('../../ctrl/manager');

//start managers
router.get('/passport', ctrl.renderPassport);

router.post('/passport', ctrl.savePassport);


router.get('/', function(req, res, next) {
    res.render('manager/passports', { title: 'All passports' });
});
//end managers



module.exports = router;