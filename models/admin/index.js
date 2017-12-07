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

module.exports.searchItem = function(collection, data){
    return new Promise(function(resolve, reject){
        shema[collection].aggregate([
            {
                $match:{
                    name: regexp(data)
                }
            }
        ], function(err, result){
            if(err) reject(err);
            else{
                resolve(result);
            }
        });
    });
};

function regexp(text) {
    if(text){
        text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        return new RegExp('(^| )' + text, 'i');
    }else{
        return "";
    }
}

module.exports.deleteItem = function(id, collection){
    console.log(id, collection);
    return new Promise(function(resolve, reject){
        shema[collection].deleteOne({_id: id}, function(err, data){
            if(err) reject(err);
            resolve(data);
        });
    });
};

