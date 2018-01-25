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

const Passports = new Schema({
    passOn: {
        type: String,
        required: true
    },
    timePassport: String,
    contactPerson: String,
    phone: String,
    customer: String,
    name: String,
    circulationFiled: String,
    sizePaper: [],
    page: String,
    redness: String,
    typePaper: [],
    typePaperSize: [],
    typePaperGramm: [],
    set: [],
    decoration: [],
    manager: [],
    allCar: [],
    file: String,
    comment: String,
    deliveryFiled: String,
    typeDeliveryFiled: String,
    address: String,
    date: String,
    timeSave: String,
    passportId: String,
    inc: {
        type: Number,
        default: 1
    }
},{versionKey: false});

const typepappers = mongoose.model('typepappers', Typepappers);
const grammpappers = mongoose.model('grammpappers', Grammpappers);
const sizepappers = mongoose.model('sizepappers', Sizepappers);
const passports = mongoose.model('passports', Passports);

module.exports.typepappers = typepappers;
module.exports.grammpappers = grammpappers;
module.exports.sizepappers = sizepappers;
module.exports.passports = passports;
