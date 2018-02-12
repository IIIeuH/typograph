const router = require('express').Router();
const ctrl   = require('../ctrl');
const managerRoutes = require('./manager/index');
const KerberosNative = require('kerberos').Kerberos;
const kerberos = new KerberosNative();
const ActiveDirectory = require('activedirectory');

const query = 'cn=*Exchange*';
const opts = {
    includeMembership : [ 'group', 'user' ], // Optionally can use 'all'
    includeDeleted : false
};
const config = { url: 'ldap://dc.plt.local',
    baseDN: 'dc=plt,dc=local',
    username: 'swra@plt.local',
    password: 'Sqwerty123$%^'
};

let ad = new ActiveDirectory(config);
//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);

router.get('/login', (req, res) => {
    res.render('login', { title: 'login' });
});


/* GET home page. */
router.get('/', async function(req, res, next) {
    try{
        console.log(`ad = ${ad}`);
        let user = await ad.find(query);
        console.log(`user = ${user}`);
    }catch(err){
        console.log(err);
    }
});
router.use('/manager', managerRoutes);





module.exports = router;
