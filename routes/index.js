const router = require('express').Router();
const ctrl   = require('../ctrl');
const managerRoutes = require('./manager/index');
const productionRoutes = require('./production/index');
const storekeeperRoutes = require('./storekeeper/index');
const prepressRoutes = require('./prepress/index');
const ticipiRoutes = require('./citipi/index');
const admin = require('./admin');

router.route('/login')
    .get(ctrl.login)
    .post(ctrl.auth);
router.post('/registration', ctrl.registration);
router.use(ctrl.checkAuth);
//ajax
router.route('/getCollection')
    .get(ctrl.getCollectionSelect);
router.get('/logout', ctrl.logout);

router.get('/', (req, res) => {
    res.redirect(req.user.role);
});

router.use('/manager', ctrl.permission, managerRoutes);
router.use('/production', ctrl.permission, productionRoutes);
router.use('/storekeeper', ctrl.permission, storekeeperRoutes);
router.use('/prepress', ctrl.permission, prepressRoutes);
router.use('/citipi', ctrl.permission, ticipiRoutes);
router.use('/admin', ctrl.permission, admin);

router.use(ctrl.error);



module.exports = router;
