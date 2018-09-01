const model = require('./shema');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

module.exports.init = function(socket){
    socket.on('savePassportBtn', async (data, priceLog, cb) => {
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
            priceLog.passportId = data.passportId;
            let saveData = new model.passports(data);
            let saveLogs = new model.pricelogs(priceLog);
            await saveData.save();
            await saveLogs.save();
            cb({status: 200, msg: "Паспорт сохранен!"});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: 'Заполните обязательные поля'});
            return err;
        }

    });


    socket.on('updatePassportBtn', async (data, cb) => {
        try{
            let idPassport = data.data.passportId;

            delete data.data.passportId;
            delete data.data.date;
            delete data.data.timeSave;
            await model.passports.update({_id: data.id}, data.data);
            let saveLogs = new model.pricelogs(data.priceLog);
            await saveLogs.save();
            socket.broadcast.emit('updatePassport', `Паспорт ${idPassport} изменен пользователем ${data.data.userUpdate}!`);
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
                socket.broadcast.emit('success-status', `Паспорт ${data.passportId} исполнен!`);
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
            socket.broadcast.emit('production-status', `Паспорт ${data.passportId} отправлен на производство!`);
            cb({status: 200, msg: 'Статус обновлен!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
        }
    });


    //Отправка допечатнику
    socket.on('prepress', async (id, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "prepress"}});
            socket.broadcast.emit('prepress-status', `Паспорт ${id} отправлен допечатнику!`);
            cb({status: 200, msg: 'Паспорт отправлен допечатнику!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });

    //Отправка citipi
    socket.on('citipi', async (id,name, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "citipi", installation: name}});
            socket.broadcast.emit('citipi-status', `Паспорт ${id} отправлен СиТиПи!`);
            cb({status: 200, msg: 'Паспорт отправлен СиТиПи!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });

    //Отправка на склад
    socket.on('storekeeper', async (id, cb) => {
        try{
            await model.passports.update({passportId: id}, {$set: {status: "keeper"}});
            socket.broadcast.emit('storekeeper-status', `Паспорт ${id} отправлен на склад!`);
            cb({status: 200, msg: 'Паспорт отправлен на склад!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка отправки! ${err}`});
        }
    });

    //Комментарий Допечатник
    socket.on('saveCommentPrepress', async (data, cb) => {
        try{
            console.log(data);
            await model.passports.update({passportId: data.id}, {$set: {prepressComment: data.prepressComment}});
            cb({status: 200, msg: 'Обновлено!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //отчет по менеджерам
    socket.on('report', async (data, cb) => {
        try{
            let start = moment(data.startDate, 'YYYY-MM-DD').add(1, 'days').toDate();
            let end =  moment(data.endDate, 'YYYY-MM-DD').add(1, 'days').toDate();

            let managersId = data.managers.map((o) => {
                return mongoose.Types.ObjectId(o);
            });
            let report = await model.passports.aggregate([
                {
                    $match: {managerId: {$in: managersId}, $and: [{createdAt: {$gte: start}}, {createdAt: {$lte: end}}]}
                },
                {
                  $project: {_id: 1, manager: "$manager", price: {$sum: '$price'}}
                },
                {
                    $group: {_id: "$manager", price: {$sum: '$price'}}
                }
            ]);
            cb({status: 200, msg: 'Обновлено!', report: report});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Отчет по истории цен
    socket.on('history', async (data, cb) => {
        try{
            console.log(data);
            let history = await model.pricelogs.find(data, {});
            cb({status: 200, msg: 'Обновлено!', history});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

};