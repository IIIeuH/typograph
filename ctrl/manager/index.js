const model = require('../../models/manager');
const io = require('../../app');


module.exports.renderPassport = function(req, res, next) {
    res.render('manager/passport', { title: 'Passport form' });
};

module.exports.savePassport =  async function(req, res, next) {
    io.on('connection', function(socket){
        socket.on('savePassportBtn', (data) => {
            console.log(data);
        });
    });

    // model.savePassport(req.body).then(function(){
    //     res.redirect('/manager');
    // });
};