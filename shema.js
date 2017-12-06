var mongoose = require('./db');
var Schema = mongoose.Schema;

var Typepappers = new Schema({
    name: {
        type: String,
        required: true
    }
},{versionKey: false});

var Grammpappers = new Schema({
    name: {
        type: String,
        required: true
    }
},{versionKey: false});

var typepappers = mongoose.model('typepappers', Typepappers);
var grammpappers = mongoose.model('grammpappers', Grammpappers);

module.exports.typepappers = typepappers;
module.exports.grammpappers = grammpappers;