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

    });

    socket.on('valStatus', async (data) => {
        try{
            await model.passports.update({passportId: data.passportId}, {status: data.status});
            socket.emit('changeStatus', {status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            socket.emit('changeStatus', {status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });

    socket.on('valPodStatus', async (data) => {
        try{
            await model.passports.update({passportId: data.passportId}, {podstatus: data.podstatus});
            socket.emit('changePodStatus', {status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            socket.emit('changePodStatus', {status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });

    socket.on('production-click', async (data) => {
        try{
            console.log(data.id);
            await model.passports.update({passportId: data.id}, {status: data.status});
            socket.emit('production-status', {status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            socket.emit('production-status', {status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });
};