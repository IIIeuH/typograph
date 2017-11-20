var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('manager', { title: 'Manager' });
});

router.get('/passport', function(req, res, next) {
    res.render('passport', { title: 'Passport form' });
});


router.get('/passports', function(req, res, next) {
    res.render('passports', { title: 'All passports' });
});

module.exports = router;
