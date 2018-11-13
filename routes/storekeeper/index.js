const router = require('express').Router();
const ctrl   = require('../../ctrl/storekeeper');

router.route('/')
    .get(ctrl.main);

router.route('/archive')
    .get(ctrl.archive);

router.get('/papers', ctrl.paper);
router.get('/order-paper', ctrl.orderPaper);
router.get('/typepappers', ctrl.typepappers);
router.get('/grammpappers', ctrl.grammpappers);
router.get('/sizepappers', ctrl.sizepappers);

router.get('/capitalization', ctrl.capitalization);
router.get('/capitalization/redactor/:id', ctrl.capitalizationRedactor);
router.post('/capitalization', (req, res) => {
    res.redirect('/storekeeper/capitalization');
});
router.get('/capitalization/edit/:id', ctrl.capitalizationEdit);
router.get('/capitalization-list', ctrl.capitalizationList);

router.get('/consumption', ctrl.consumption);
router.get('/consumption-list', ctrl.consumptionList);
router.get('/consumption/edit/:id', ctrl.consumptionEdit);
router.get('/passports-no-papers', ctrl.passportsNoPapers);
router.get('/getpassport/:passportId', ctrl.getPassport);

router.get('/:id', ctrl.passport);






module.exports = router;