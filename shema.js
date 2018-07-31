const mongoose = require('./db');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


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
    timePassport: {
        type: String
    },
    contactPerson: {
        type: String
    },
    phone: {
        type: String
    },
    customer: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    circulationFiled: {
        type: String,
        required: true
    },
    sizePaper: [],
    page: {
        type: String
    },
    redness:{
        type: String,
        required: true
    },
    typePaper: String,
    typePaperSize: String,
    typePaperGramm: String,
    set: String,
    decoration: String,
    manager: {
        type: Array,
        required: true
    },
    allCar: [],
    file: String,
    comment: String,
    deliveryFiled: String,
    typeDeliveryFiled: String,
    address: String,
    date: String,
    timeSave: String,
    passportId: String,
    inc: Number,
    managerId: ObjectId,
    status: String,
    podstatus: String,
    productionStatus: String,
    installation: String,
    userUpdate: String,
    prepressComment: String,
    price: Number,
    createdAt: Date,
    updatedAt: Date
},{versionKey: false});

const Users = new Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "manager"
    },
    nameRole: {
        type: String,
        default: "Менеджер"
    },
    main: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: Array,
        default: [{name: '/manager', group: "Менеджер", access: 2}]
    },
    name: {
        type: String,
        default: 'Anonymous'
    }
},{versionKey: false});

const typepappers = mongoose.model('typepappers', Typepappers);
const grammpappers = mongoose.model('grammpappers', Grammpappers);
const sizepappers = mongoose.model('sizepappers', Sizepappers);
const passports = mongoose.model('passports', Passports);
const users = mongoose.model('users', Users);

module.exports.typepappers = typepappers;
module.exports.grammpappers = grammpappers;
module.exports.sizepappers = sizepappers;
module.exports.passports = passports;
module.exports.users = users;
module.exports.ObjectId = ObjectId;
