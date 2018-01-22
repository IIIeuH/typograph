const router = require('express').Router();
const ctrl   = require('../../ctrl/manager');

//start managers
router.get('/', function(req, res) {
    res.render('manager/passports', { title: 'All passports' });
});
router.get('/passport', ctrl.renderPassport);
router.post('/passport', ctrl.savePassport);

//end managers



module.exports = router;