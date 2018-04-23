const model = require('./shema');

module.exports.init = function(socket){
    socket.on('savePassportBtn', async (data, cb) => {
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
                data.inc = + 1;
            }else{
                data.inc = inc[0].inc + 1;
            }
            let str = '00000';
            let number = +String(data.inc).length;
            str = str.slice(number) + String(data.inc);
            data.passportId += '-' + str;
            let saveData = new model.passports(data);
            await saveData.save();
            cb({status: 200, msg: "Паспорт сохранен!"});
        }catch(err){
            cb({status: 412, err: err._message, msg: 'Заполните обязательные поля'});
            return err;
        }

    });


    socket.on('updatePassportBtn', async (data, cb) => {
        try{
            delete data.data.passportId;
            delete data.data.date;
            delete data.data.timeSave;
            await model.passports.update({_id: data.id}, data.data);
            cb({status: 200, msg: 'Пасспорт обновлен!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
            return err;
        }

    });

    socket.on('valStatus', async (data, cb) => {
        try{
            console.log(data.name);
            if(data.name === 'Исполнен'){
                console.log(data.name);
                await model.passports.updateOne({passportId: data.passportId}, {$set: {status: "success", productionStatus: data.status}});
            }else{
                await model.passports.updateOne({passportId: data.passportId}, {$set: {status: "production", productionStatus: data.status}});
            }
            cb({status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });

    socket.on('valPodStatus', async (data, cb) => {
        try{
            await model.passports.updateOne({passportId: data.passportId}, {$set: {status: "production", podstatus: data.podstatus}});
            cb({status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });


    //Отправка допечатнику
    socket.on('prepress', async (id, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "prepress"}});
            cb({status: 200, msg: 'Паспорт отправлен допечатнику!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });

    //Отправка citipi
    socket.on('citipi', async (id, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "citipi"}});
            cb({status: 200, msg: 'Паспорт отправлен СиТиПи!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });

    //Отправка на склад
    socket.on('storekeeper', async (id, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "keeper"}});
            cb({status: 200, msg: 'Паспорт отправлен на склад!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });
};