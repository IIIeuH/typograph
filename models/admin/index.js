const shema = require('../../shema');

module.exports.findAll = async (collection) => {
    try{
        return await shema[collection].find();
    }catch (err){
        console.log(err);
        return err;
    }
};

module.exports.findOne = async (collection, id) => {
    try{
        return await shema[collection].findOne({_id: id});
    }catch (err){
        console.log(err);
        return err;
    }
};

module.exports.saveAll = async (data, collection) => {
    try{
        return await shema[collection].create(data);
    }catch (err){
        console.log(err);
        return err;
    }
};

module.exports.update = async (data, collection, id) => {
    try{
        return await shema[collection].update({_id: id}, data);
    }catch (err){
        console.log(err);
        return err;
    }
};

module.exports.searchItem = async (collection, data) => {
    try{
        return await shema[collection].aggregate([
            {
                $match:{
                    name: regexp(data)
                }
            }
        ]);
    }catch (err){
        console.log(err);
        return err;
    }
};

function regexp(text) {
    if(text){
        text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        return new RegExp('(^| )' + text, 'i');
    }else{
        return "";
    }
}

module.exports.deleteItem = async (id, collection) => {
    try{
        return await shema[collection].deleteOne({_id: id});
    }catch (err){
        console.log(err);
        return err;
    }
};

