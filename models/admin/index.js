var shema = require('../../shema');

module.exports.findAll = function(collection){
    return new Promise(function(resolve, reject){
        shema[collection].find({}, function(err, data){
            if(err) reject(err);
            resolve(data);
        });
    });
};

module.exports.saveAll = function(data, collection){
    console.log(collection);
    return new Promise(function(resolve, reject){
        shema[collection].create(data, function(err, data){
            if(err) reject(err);
            resolve(data);
        });
    });
};