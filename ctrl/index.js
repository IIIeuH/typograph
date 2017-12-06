var model = require('../models/admin/index');

exports.getCollectionSelect = function(req, res, next){
    console.log(req.query);
    model.searchItem( req.query.collection, req.query.term).then(function(data){
        console.log(data);
        res.json(data);
    });
};