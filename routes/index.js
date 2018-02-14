const router = require('express').Router();
const ctrl   = require('../ctrl');
const managerRoutes = require('./manager/index');




router.route('/login')
    .get(ctrl.login)
    .post(ctrl.auth);
router.post('/registration', ctrl.registration);
router.use(ctrl.checkAuth);
router.get('/logout', ctrl.logout);
//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);

router.use('/manager', managerRoutes);
router.use('/', ctrl.role);
router.use('/admin', ctrl.role);



module.exports = router;
