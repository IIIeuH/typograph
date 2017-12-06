var express = require('express');
var router = express.Router();
var ctrl   = require('../ctrl');


//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('manager', { title: 'Manager' });
});



//start managers
router.get('/passport', function(req, res, next) {
    res.render('passport', { title: 'Passport form' });
});


router.get('/passports', function(req, res, next) {
    res.render('passports', { title: 'All passports' });
});
//end managers
module.exports = router;
