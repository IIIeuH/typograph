const mongoose = require('./db');
const Schema = mongoose.Schema;

const Typepappers = new Schema({
    name: {
        type: String,
        required: true
    }
},{versionKey: false});

const Grammpappers = new Schema({
    name: {
        type: String,
        required: true
    }
},{versionKey: false});

const Sizepappers = new Schema({
    name: {
        type: String,
        required: true
    }
},{versionKey: false});

const typepappers = mongoose.model('typepappers', Typepappers);
const grammpappers = mongoose.model('grammpappers', Grammpappers);
const sizepappers = mongoose.model('sizepappers', Sizepappers);

module.exports.typepappers = typepappers;
module.exports.grammpappers = grammpappers;
module.exports.sizepappers = sizepappers;