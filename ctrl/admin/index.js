var wrap = require('co-express');

exports.typePappers = function(req, res, next){
    res.render('admin/typepapper', {title: 'Администратор - тип бумаги'});
};
exports.putTypePappers = wrap(function* (req, res, next){
    var data = JSON.parse(req.body.data);
    var typePappers = yield db.collection('typepappers');
    console.log(typePappers);
    typePappers.find({}).toArray(function(err, data){
        if(err) console.log(err);
        console.log(data);
    });
});