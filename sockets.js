const model = require('./shema');

module.exports.init = function(socket){
    socket.on('savePassportBtn', async (data) => {
        try{
            let inc = await model.passports.aggregate([
                {
                    $match: {}
                },
                {
                    $group: {
                        _id: null,
                        inc: {$max: "$inc"}
                    }
                }
            ]);
            if(!inc.length){
                data.inc = 1;
            }else{
                data.inc = inc[0].inc + 1;
            }
            console.log(data);
            let saveData = new model.passports(data);
            await saveData.save();
            socket.emit('readySavePassport', {status: 200});
        }catch(err){
            socket.emit('readySavePassport', {status: 412, err: err._message, msg: 'Заполните обязательные поля'});
            return err;
        }

    });


    socket.on('updatePassportBtn', async (data) => {
        try{
            delete data.data.passportId;
            delete data.data.date;
            delete data.data.timeSave;
            await model.passports.update({_id: data.id}, data.data);
            socket.emit('readyUpdatePassport', {status: 200, msg: 'Пасспорт обновлен!'});
        }catch(err){
            socket.emit('readyUpdatePassport', {status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
            return err;
        }

    })
};