const model = require('./shema');
const mongoose = require('mongoose');
const moment = require('moment');
const _ = require('lodash');

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

async function sellPapperAndLogs(allCar,managerName, passportId){
    var result = groupBy(allCar, function(item){
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

        console.log(stock, count);

        if(stock && stock.count >= count){
            await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
            await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: (stock.count - count), manager: managerName, passportId: passportId, enough:true}).save();
        }else if(stock && stock.count < count){
            arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count)});
            await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
            await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count), manager: managerName, passportId: passportId, enough:false}).save();
        }else if(!stock){
            arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: count});
            await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: count, manager: managerName, passportId: passportId, enough:false}).save();
            //await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
            //cb({status: 200, msg: `На складе не хватает бумаги тип: ${type} граммаж: ${gramm} формат: ${size} ${count - (stock.count || 0)} штук.`});
            //let confirm = confirm(`На складе нет бумаги тип: ${type} граммаж: ${gramm} формат: ${size}, хотите оставить заявку?`)
        }

        return {typePaper: type, grammPaper: gramm, sizePaper: size, count: count};
    });

    Promise.all(res).then( async() =>{
        return arrayNoPapers;
    });
}


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
            data.incString = data.inc;
            let str = '00000';
            let number = +String(data.inc).length;
            str = str.slice(number) + String(data.inc);
            data.passportId += '-' + str;
            priceLog.passportId = data.passportId;
            let saveData = new model.passports(data);
            let saveLogs = new model.pricelogs(priceLog);



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
                    //await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
                    //await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: (stock.count - count), manager: data.managerName, passportId: data.passportId, enough:true}).save();
                }else if(stock && stock.count < count){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count), stock: true});
                    //await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
                    //await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count), manager: data.managerName, passportId: data.passportId, enough:false}).save();
                }else if(!stock){
                    arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: count, stock: false});
                    await new model.stockpapers({typePaper: type, grammPaper: gramm, sizePaper: size, count: 0}).save();
                    //cb({status: 200, msg: `На складе не хватает бумаги тип: ${type} граммаж: ${gramm} формат: ${size} ${count - (stock.count || 0)} штук.`});
                    //let confirm = confirm(`На складе нет бумаги тип: ${type} граммаж: ${gramm} формат: ${size}, хотите оставить заявку?`)
                }

                return {typePaper: type, grammPaper: gramm, sizePaper: size, count: count};
            });

            Promise.all(res).then( async() =>{
                if(arrayNoPapers.length){
                    let check = await model.passports.findOne({passportId: data.passportId});
                    if(!check){
                        await saveData.save();
                        await saveLogs.save();
                        cb({status: 201, arr: arrayNoPapers});
                    }else{
                        return false
                    }
                }else{
                    let check = await model.passports.findOne({passportId: data.passportId});
                    if(!check) {
                        await saveData.save();
                        await saveLogs.save();
                        cb({status: 200, msg: "Паспорт сохранен!"});
                    }else{
                        return false;
                    }
                }
            });
        }catch(err){
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

            // function groupBy( array , f )
            // {
            //     var groups = {};
            //     array.forEach( function( o )
            //     {
            //         var group = JSON.stringify( f(o) );
            //         groups[group] = groups[group] || [];
            //         groups[group].push( o );
            //     });
            //     return Object.keys(groups).map( function( group )
            //     {
            //         return groups[group];
            //     })
            // }
            //
            // var result = groupBy(data.data.allCar, function(item){
            //     return [item.typePaper, item.grammPaper, item.sizePaper];
            // });
            //
            // let arrayNoPapers = [];
            //
            // let res = result.map( async(o) => {
            //     let count = 0;
            //     let type = null;
            //     let gramm = null;
            //     let size = null;
            //     o.forEach( (item)  => {
            //         count += +item.allSheet;
            //         type = item.typePaper;
            //         gramm = item.grammPaper;
            //         size = item.sizePaper;
            //     });
            //
            //     let stock = await model.stockpapers.findOne({typePaper: type, grammPaper: gramm, sizePaper: size});
            //
            //     if(stock && stock.count >= count){
            //         await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$inc: {count: -count}});
            //         await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: count, manager: data.managerName, passportId: idPassport}).save();
            //     }else if(stock && stock.count < count){
            //         arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: (count - stock.count)});
            //         await model.stockpapers.update({typePaper: type, grammPaper: gramm, sizePaper: size}, {$set: {count: 0}});
            //         await new model.paperlogs({typePaper: type, grammPaper: gramm, sizePaper: size, count: stock.count, manager: data.managerName, passportId: idPassport}).save();
            //     }else if(!stock){
            //         arrayNoPapers.push({typePaper: type, grammPaper: gramm, sizePaper: size, count: count});
            //         //cb({status: 200, msg: `На складе не хватает бумаги тип: ${type} граммаж: ${gramm} формат: ${size} ${count - (stock.count || 0)} штук.`});
            //         //let confirm = confirm(`На складе нет бумаги тип: ${type} граммаж: ${gramm} формат: ${size}, хотите оставить заявку?`)
            //     }
            //
            //     return {typePaper: type, grammPaper: gramm, sizePaper: size, count: count};
            // });
            //
            // Promise.all(res).then( async() =>{
            //     if(arrayNoPapers.length){
            //         await model.passports.update({_id: data.id}, data.data);
            //         let saveLogs = new model.pricelogs(data.priceLog);
            //         await saveLogs.save();
            //         socket.broadcast.emit('updatePassport', `Паспорт ${idPassport} изменен пользователем ${data.data.userUpdate}!`);
            //         cb({status: 201, arr: arrayNoPapers});
            //     }else{
            //         await model.passports.update({_id: data.id}, data.data);
            //         let saveLogs = new model.pricelogs(data.priceLog);
            //         await saveLogs.save();
            //         socket.broadcast.emit('updatePassport', `Паспорт ${idPassport} изменен пользователем ${data.data.userUpdate}!`);
            //         cb({status: 200, msg: 'Пасспорт обновлен!'});
            //     }
            // });

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
    socket.on('prepress', async (id, allCar,managerName, passportId, cb) => {
        try{
            let resInc = await model.passports.aggregate([
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
            let inc = 0;
            if(!resInc.length){
                inc = + 1;
            }else{
                inc = resInc[0].inc + 1;
            }
            let str = '00000';
            let number = +String(inc).length;
            str = str.slice(number) + String(inc);
            await sellPapperAndLogs(allCar,managerName, passportId);
            await model.passports.update({passportId: id}, {$set: {status: "prepress"}});
            socket.broadcast.emit('prepress-status', `Паспорт ${id} отправлен допечатнику!`);
            cb({status: 200, msg: 'Паспорт отправлен допечатнику!'});
        }catch(err){
            console.log(err);
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
            let start = moment(data.startDate, 'YYYY-MM-DD').startOf('day').toDate();
            let end =  moment(data.endDate, 'YYYY-MM-DD').endOf('day').toDate();

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

    //полный отчет по менеджерам
    socket.on('adminReportPassports', async (data, cb) => {
        try{

            let start = moment(data.startDate, 'YYYY-MM-DD').startOf('day').toDate();
            let end =  moment(data.endDate, 'YYYY-MM-DD').endOf('day').toDate();


            let passports = await model.passports.aggregate([
                {
                    $match: {managerId: mongoose.Types.ObjectId(data.manager), $and: [{createdAt: {$gte: start}}, {createdAt: {$lte: end}}]}
                },
                {
                    $project: {id: 1, passportId: 1, inc: 1, date: 1}
                }
            ]);

            let price = await model.passports.aggregate([
                {
                    $match: {managerId: mongoose.Types.ObjectId(data.manager), $and: [{createdAt: {$gte: start}}, {createdAt: {$lte: end}}]}
                },
                {
                    $project: {_id: 1, price: {$sum: '$price'}}
                },
                {
                    $group: {_id: null, price: {$sum: '$price'}}
                }
            ]);


            cb({status: 200, msg: 'Обновлено!', passports: passports, price: price});
        }catch(err){
            console.log(err);
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

    //получить Id менеджера
    socket.on('getManager', async (data, cb) => {
        try{
            let manager = await model.users.find({name: data}, {id: 1});
            cb({status: 200, msg: 'Обновлено!', manager: manager});
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

    ///Добавление бумаги кладовщик
    socket.on('addPapper', async (data, cb) => {
        try{
            await new model[data.collection]({name: data.name}).save();
            cb({status: 200, msg: 'Обновлено!'});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Удаление бумаги
    socket.on('removeItemId', async (data, cb) => {
        try{
            console.log(data);
            await model[data.collection].remove({ _id: data._id });
            cb({status: 200, msg: 'Удалено!'});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка удаления! ${err}`});
        }
    });


    //Весь Список Типа бумаги
    socket.on('typepappers', async (cb) => {
        try{
            let data = await model.typepappers.find();
            let result = data.map( (o) => {
                return {id: o._id, text: o.name};
            });
            cb({status: 200, msg: 'Удалено!', result: result});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Невозможно получить список бумаги! ${err}`});
        }
    });

    //Весь Список ГРаммажа бумаги
    socket.on('grammpappers', async (cb) => {
        try{
            let data = await model.grammpappers.find();
            let result = data.map( (o) => {
               return {id: o._id, text: o.name};
            });
            cb({status: 200, msg: 'Удалено!', result: result});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Невозможно получить список бумаги! ${err}`});
        }
    });

    //Весь Список Формата бумаги
    socket.on('sizepappers', async (cb) => {
        try{
            let data = await model.sizepappers.find();
            let result = data.map( (o) => {
                return {id: o._id, text: o.name};
            });
            cb({status: 200, msg: 'Удалено!', result: result});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Невозможно получить список бумаги! ${err}`});
        }
    });


    //Добавление бумаги на склад через приход массивом
    socket.on('addPaperCapitalization', async (data, cb) => {
        try{

            await new model.capitalizations(data).save();

            for (let item of data.papper){
                let paper = await model.stockpapers.findOne({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId});

                if(paper){
                    await model.stockpapers.update({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId}, {$inc: {count: item.count}});
                }else{
                    await new model.stockpapers(item).save();
                }
            }
            cb({status: 200, msg: 'Обновлено!'});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Обновление бумаги на склад через приход массивом
    socket.on('redactorPaperCapitalization', async (data, id, cb) => {
        try{
            await model.capitalizations.update({_id: mongoose.Types.ObjectId(id)}, {$set: data});

            for (let item of data.papper){
                console.log(item);
                let paper = await model.stockpapers.findOne({typePaperId: mongoose.Types.ObjectId(item.typePaperId), grammPaperId: mongoose.Types.ObjectId(item.grammPaperId), sizePaperId: mongoose.Types.ObjectId(item.sizePaperId)});
                if(paper){
                    await model.stockpapers.update({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId}, {$inc: {count: item.count}});
                }else{
                    await new model.stockpapers(item).save();
                }
            }
            cb({status: 200, msg: 'Обновлено!'});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Списание бумаги на склад через приход массивом для того что бы заного запсать новую бумагу
    socket.on('subtractPaperCapitalization', async (data, cb) => {
        try{
            for (let item of data){
                let paper = await model.stockpapers.findOne({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId});

                if(paper){
                    await model.stockpapers.update({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId}, {$inc: {count: -item.count}});
                }
            }
            cb({status: 200, msg: 'Обновлено!'});
        }catch(err){
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Спасание бумаги со склад через расход массивом
    socket.on('addPaperConsumption', async (data, cb) => {
        try{


            let resultList = data.papper.map( async(item) =>{
                return await model.stockpapers.findOne({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId});
            });


            Promise.all(resultList).then( async(res)=>{
                let flag = false;
                res.forEach( (item, i) =>{
                   if(!item){
                       cb({status: 412, msg: `Операция не может быть выполнена так как бумаги ${data.papper[i].typePaper} ${data.papper[i].grammPaper} ${data.papper[i].sizePaper} нет на складе!`});
                       flag = false;
                       return false;
                   }else if(item.count < data.papper[i].count){
                       cb({status: 412, msg: `Операция не может быть выполнена так как бумаги ${data.papper[i].typePaper} ${data.papper[i].grammPaper} ${data.papper[i].sizePaper} на складе всего ${item.count} штук!`});
                       flag = false;
                       return false;
                   }else{
                       flag = true;
                   }
                });


                if(flag){
                    await new model.consumptions(data).save();
                    for (let item of data.papper){
                        let paper = await model.stockpapers.findOne({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId});
                        if(paper){
                            await model.stockpapers.update({typePaperId: item.typePaperId, grammPaperId: item.grammPaperId, sizePaperId: item.sizePaperId}, {$inc: {count: -item.count}});
                        }
                    }
                    cb({status: 200, msg: 'Обновлено!'});
                }
            });
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Подгрузка данных
    socket.on('loadContent', async (skip, cb) => {
        try{
            console.log(skip);
            let passports = await model.passports.find({},{passOn: 1, inc: 1, customer: 1, price: 1, circulationFiled: 1, passportId: 1, status: 1, typePaper: 1, typePaperSize: 1, typePaperGramm: 1, createdAt: 1, date: 1}).sort({inc: -1}).skip(skip).limit(20);
            cb({status: 200, passports});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

    //Поиск данных
    socket.on('searchPassports', async (str, field, role, dop, cb) => {
        try{
            let search = {};

            if(role === 'manager'){
                search[field] = new RegExp(str, 'i');
            }else if(role === 'citipi' && !dop){
                search[field] = new RegExp(str, 'i');
                search.status = role;
            }else if(role === 'citipi' && dop){
                search[field] = new RegExp(str, 'i');
            }else if(role === 'prepress' && !dop){
                search[field] = new RegExp(str, 'i');
                search.status = role;
            }else if(role === 'prepress' && dop){
                search[field] = new RegExp(str, 'i');
            }
            let passports = await model.passports.find(search,{passOn: 1, inc: 1, customer: 1, price: 1, circulationFiled: 1, passportId: 1, status: 1, typePaper: 1, typePaperSize: 1, typePaperGramm: 1, createdAt: 1, date: 1}).sort({inc: -1});

            cb({status: 200, passports});
        }catch(err){
            console.log(err);
            cb({status: 412, err: err._message, msg: `Ошибка обновления! ${err}`});
        }
    });

};
