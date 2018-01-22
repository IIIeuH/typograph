const model = require('./shema');

module.exports.init = function(socket){
    socket.on('savePassportBtn', async (data) => {
        try{
            let saveData = new model.passports(data);
            await saveData.save();
            socket.emit('readySavePassport', {status: 200});
        }catch(err){
            socket.emit('readySavePassport', {status: 412, err: err._message, msg: 'Заполните обязательные поля'});
        }

    })
};