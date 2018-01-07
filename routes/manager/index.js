const router = require('express').Router();

//start managers
router.get('/passport', function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
});


router.get('/', function(req, res, next) {
    console.log(123);
    res.render('manager/passports', { title: 'All passports' });
});
//end managers



module.exports = router;