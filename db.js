var conf = require('./config');
var mongoose = require('mongoose');
mongoose.connect(conf.url, { useMongoClient: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;