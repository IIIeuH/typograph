var model = require('../models/admin/index');

exports.getCollectionSelect = async (req, res, next) => {
    res.json(await model.searchItem(req.query.collection, req.query.term));
};


