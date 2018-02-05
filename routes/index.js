const router = require('express').Router();
const ctrl   = require('../ctrl');
const managerRoutes = require('./manager/index');
var KerberosNative = require('kerberos').Kerberos;
var kerberos = new KerberosNative();
var ActiveDirectory = require('activedirectory');

//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);

router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
});


/* GET home page. */
router.get('/', function(req, res, next) {
    //cut phrase "Negotiate "
    var ticket = req.headers.authorization.substring(10);

//init context
    kerberos.authGSSServerInit("HTTP", function(err, context) {
        //check ticket
        kerberos.authGSSServerStep(context, ticket, function(err) {
            //in success context contains username
            res.set( 'WWW-Authenticate', 'Negotiate ' + context.response);
            res.render('index', { title: 'Manager', user: context.username});
        });
    });
});
router.use('/manager', managerRoutes);





module.exports = router;
