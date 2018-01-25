const model = require('./shema');

module.exports.init = function(socket){
    socket.on('savePassportBtn', async (data) => {
        try{
            // let inc = await model.passports.aggregate([
            //     {
            //         $match: {}
            //     },
            //     {
            //         $group: {
            //             _id: '',
            //             inc: {$max: '$inc'}
            //         }
            //     }
            // ]);
            // console.log(inc);
            // data.inc  = 1;
            // if(inc[0].inc){
            //     data.inc = inc[0].inc + 1;
            // }
            let saveData = new model.passports(data);
            await saveData.save();
            socket.emit('readySavePassport', {status: 200});
        }catch(err){
            socket.emit('readySavePassport', {status: 412, err: err._message, msg: 'Заполните обязательные поля'});
            return err;
        }

    })
};