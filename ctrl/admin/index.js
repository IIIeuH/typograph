var model = require('../../models/admin/index');

exports.typePappers = function(req, res, next){
    var collection = req.path.slice(1);
    model.findAll(collection).then(function(data){
        res.render('admin/typepapper', {title: 'Администратор - тип бумаги', typePappers: data});
    });
};

exports.grammPappers = function(req, res, next){
    var collection = req.path.slice(1);
    model.findAll(collection).then(function(data){
        res.render('admin/grammpapper', {title: 'Администратор - граммаж бумаги', grammPappers: data});
    });
};

exports.putPappers = function (req, res, next){
    var data = JSON.parse(req.body.data);
    var collection = req.path.slice(1);
    model.saveAll(data, collection).then(function(data){
        res.json(data);
    });
};

exports.deleteItem = function (req, res, next){
    var collection = req.path.slice(1);
    model.deleteItem(req.body.id, collection).then(function(data){
        res.json(data);
    });
};