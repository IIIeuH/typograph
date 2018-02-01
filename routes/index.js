const router = require('express').Router();
const ctrl   = require('../ctrl');
const managerRoutes = require('./manager/index');
const expressKerberos = require('express-kerberos');

//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);

router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
});


/* GET home page. */
router.get('/', expressKerberos.default(), function(req, res, next) {
  res.render('index', { title: 'Manager', user: req.auth});
});
router.use('/manager', managerRoutes);





module.exports = router;
