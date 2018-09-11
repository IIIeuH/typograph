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



            function groupBy( array , f )
            {
                var groups = {};
                array.forEach( function( o )
                {
                    var group = JSON.stringify( f(o) );
                    groups[group] = groups[group] || [];
                    groups[group].push( o );
                });
                return Object.keys(groups).map( function( group )
                {
                    return groups[group];
                })
            }

            var result = groupBy(data.allCar, function(item){
                return [item.typePaper, item.grammPaper, item.sizePaper];
            });

            let arrayNoPapers = [];

            let res = result.map( async(o) => {
                let count = 0;
                let type = null;
                let gramm = null;
                let size = null;
                o.forEach( (item)  => {
                    count += +item.allSheet;
                    type = item.typePaper;
                    gramm = item.grammPaper;
                    size = item.sizePaper;
                });

                let stock = await model.stockpapers.findOne({typePaper: type, grammPaper: gramm, sizePaper: size});

                if(stock && stock.count >= count){
                    await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
                }else if(stock && stock.count < count){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count)});
                }else if(!stock){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: count});
                    //cb({status: 200, msg: `На складе не хватает бумаги тип: ${type} граммаж: ${gramm} формат: ${size} ${count - (stock.count || 0)} штук.`});
                    //let confirm = confirm(`На складе нет бумаги тип: ${type} граммаж: ${gramm} формат: ${size}, хотите оставить заявку?`)
                }

                return {typePaper: type, grammPaper: gramm, sizePaper: size, count: count};
            });

            Promise.all(res).then( async() =>{
                if(arrayNoPapers.length){
                    await saveData.save();
                    await saveLogs.save();
                    cb({status: 201, arr: arrayNoPapers});
                }else{
                    await saveData.save();
                    await saveLogs.save();
                    cb({status: 200, msg: "Паспорт сохранен!"});
                }
            });
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

            function groupBy( array , f )
            {
                var groups = {};
                array.forEach( function( o )
                {
                    var group = JSON.stringify( f(o) );
                    groups[group] = groups[group] || [];
                    groups[group].push( o );
                });
                return Object.keys(groups).map( function( group )
                {
                    return groups[group];
                })
            }

            var result = groupBy(data.data.allCar, function(item){
                return [item.typePaper, item.grammPaper, item.sizePaper];
            });

            let arrayNoPapers = [];

            let res = result.map( async(o) => {
                let count = 0;
                let type = null;
                let gramm = null;
                let size = null;
                o.forEach( (item)  => {
                    count += +item.allSheet;
                    type = item.typePaper;
                    gramm = item.grammPaper;
                    size = item.sizePaper;
                });

                let stock = await model.stockpapers.findOne({typePaper: type, grammPaper: gramm, sizePaper: size});

                if(stock && stock.count >= count){
                    await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
                }else if(stock && stock.count < count){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count)});
                }else if(!stock){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: count});
                    //cb({status: 200, msg: `На складе не хватает бумаги тип: ${type} граммаж: ${gramm} формат: ${size} ${count - (stock.count || 0)} штук.`});
                    //let confirm = confirm(`На складе нет бумаги тип: ${type} граммаж: ${gramm} формат: ${size}, хотите оставить заявку?`)
                }

                return {typePaper: type, grammPaper: gramm, sizePaper: size, count: count};
            });

            Promise.all(res).then( async() =>{
                if(arrayNoPapers.length){
                    await model.passports.update({_id: data.id}, data.data);
                    let saveLogs = new model.pricelogs(data.priceLog);
                    await saveLogs.save();
                    socket.broadcast.emit('updatePassport', `Паспорт ${idPassport} изменен пользователем ${data.data.userUpdate}!`);
                    cb({status: 201, arr: arrayNoPapers});
                }else{
                    await model.passports.update({_id: data.id}, data.data);
                    let saveLogs = new model.pricelogs(data.priceLog);
                    await saveLogs.save();
                    socket.broadcast.emit('updatePassport', `Паспорт ${idPassport} изменен пользователем ${data.data.userUpdate}!`);
                    cb({status: 200, msg: 'Пасспорт обновлен!'});
                }
            });
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${err}`});
            return err;
        }

    });


    socket.on('stockOrder', async (data, cb) => {
       try{
           await model.stockorders(data).save();
           cb({status: 200});
       }catch (e) {
           cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${e}`});
       }
    });

    //Изменения статуса заказа
    socket.on('change-status-order-paper', async (data, cb) => {
       try{
           await model.stockorders.update({_id: data._id}, {$set: {status: data.status}});
           cb({status: 200, msg: 'Сохранено'});
       }catch (e) {
           cb({status: 412, err: err._message, msg: `Ошибка сохранения! ${e}`});
       }
    });

    socket.on('valStatus', async (data, cb) => {
        try{
            console.log(data.name);
            if(data.name === 'Исполнен'){
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
            let history = await model.pricelogs.find(data, {});
            cb({status: 200, msg: 'Обновлено!', history});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Добавление бумаги на склад
    socket.on('addPaper', async (data, cb) => {
        try{
            let res = null;
            let paper = await model.stockpapers.findOne({typePaperId: data.typePaperId, grammPaperId: data.grammPaperId, sizePaperId: data.sizePaperId});

            if(paper){
                res =  await model.stockpapers.update({typePaperId: data.typePaperId, grammPaperId: data.grammPaperId, sizePaperId: data.sizePaperId}, {$inc: {count: data.count}});
            }else{
                res = await new model.stockpapers(data).save();
            }
            cb({status: 200, msg: 'Обновлено!', res:res});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });
    //Списание бумаги на склад
    socket.on('removePaper', async (data, cb) => {
        try{

            let paper = await model.stockpapers.findOne({typePaperId: data.typePaperId, grammPaperId: data.grammPaperId, sizePaperId: data.sizePaperId});

            if(paper.count < data.count){
                cb({status: 412, msg: 'Вы не можете списать больше чем есть на складе!'});
            }else{
                await model.stockpapers.update({typePaperId: data.typePaperId, grammPaperId: data.grammPaperId, sizePaperId: data.sizePaperId}, {$inc: {count: -data.count}});
                cb({status: 200, msg: 'Обновлено!'});
            }
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

};