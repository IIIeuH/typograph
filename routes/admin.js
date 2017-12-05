var express = require('express');
var router = express.Router();

/* GET admin listing. */
router.get('/', function(req, res, next) {
    res.render('admin/index', {title: 'Admin panel'})
});

router.get('/typepapper', function(req, res, next) {
  res.render('admin/typepapper', {title: 'Admin panel'})
});

router.get('/grammpapper', function(req, res, next) {
    res.render('admin/grammpapper', {title: 'Admin panel'})
});

module.exports = router;
