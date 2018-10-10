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
    updatedAt: Date,
    priceArray: Array
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


const PriceLogs = new Schema({
    meta: String,
    date: {
        type: Date,
        default: new Date()
    },
    manager: String,
    price: Array,
    passportId: String
},{versionKey: false});

const PaperLogs = new Schema({
    date: {
        type: Date,
        default: new Date()
    },
    manager: String,
    passportId: String,
    typePaper: String,
    grammPaper: String,
    sizePaper: String,
    enough: Boolean,
    count: Number,
    managerName: String
},{versionKey: false});

const StockPapers = new Schema({
    typePaperId: ObjectId,
    grammPaperId: ObjectId,
    sizePaperId: ObjectId,
    typePaper: String,
    grammPaper: String,
    sizePaper: String,
    count: Number,
    person: String
},{versionKey: false});

const StockOrder = new Schema({
    order: [],
    date: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: 'await'
    },
    person: String
},{versionKey: false});


const Capitalization = new Schema({
    number: Number,
    date: Date,
    provider: String,
    totals: Number,
    papper:[
        {
            typePaperId: ObjectId,
            typePaper: String,
            grammPaperId: ObjectId,
            grammPaper: String,
            sizePaperId: ObjectId,
            sizePaper: String,
            count: Number,
            price: Number,
            priceAll: Number
        }
    ]
},{versionKey: false});


const Consumption = new Schema({
    number: Number,
    date: Date,
    comment: String,
    papper:[
        {
            typePaperId: ObjectId,
            typePaper: String,
            grammPaperId: ObjectId,
            grammPaper: String,
            sizePaperId: ObjectId,
            sizePaper: String,
            count: Number
        }
    ]
},{versionKey: false});


const typepappers = mongoose.model('typepappers', Typepappers);
const grammpappers = mongoose.model('grammpappers', Grammpappers);
const sizepappers = mongoose.model('sizepappers', Sizepappers);
const passports = mongoose.model('passports', Passports);
const users = mongoose.model('users', Users);
const pricelogs = mongoose.model('pricelogs', PriceLogs);
const stockpapers = mongoose.model('stockpapers', StockPapers);
const stockorders = mongoose.model('stockorders', StockOrder);
const capitalizations = mongoose.model('capitalizations', Capitalization);
const consumptions = mongoose.model('consumptions', Consumption);
const paperlogs = mongoose.model('paperlogs', PaperLogs);

module.exports.typepappers = typepappers;
module.exports.grammpappers = grammpappers;
module.exports.sizepappers = sizepappers;
module.exports.passports = passports;
module.exports.users = users;
module.exports.pricelogs = pricelogs;
module.exports.stockpapers = stockpapers;
module.exports.stockorders = stockorders;
module.exports.capitalizations = capitalizations;
module.exports.consumptions = consumptions;
module.exports.paperlogs = paperlogs;
module.exports.ObjectId = ObjectId;
