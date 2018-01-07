const model = require('../../models/admin/index');

exports.typePappers = async (req, res, next) => {
    let collection = req.path.slice(1);
    let data = await model.findAll(collection);
    res.render('admin/typepapper', {title: 'Администратор - тип бумаги', typePappers: data});
};

exports.grammPappers = async (req, res, next) => {
    let collection = req.path.slice(1);
    let data = await model.findAll(collection);
    res.render('admin/grammpapper', {title: 'Администратор - граммаж бумаги', grammPappers: data});
};

exports.sizePappers = async (req, res, next) => {
    let collection = req.path.slice(1);
    let data = await model.findAll(collection);
    res.render('admin/sizepapper', {title: 'Администратор - размер бумаги', sizePappers: data});
};

exports.putPappers = async (req, res, next) => {
    let data = JSON.parse(req.body.data);
    let collection = req.path.slice(1);
    res.json(await model.saveAll(data, collection));
};

exports.deleteItem = async (req, res, next) => {
    let collection = req.path.slice(1);
    res.json(await model.deleteItem(req.body.id, collection));

};