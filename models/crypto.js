const bcrypt = require('bcrypt'),
      saltRounds = 10;

exports.encrypt = function (password){
    return bcrypt.hashSync(password, saltRounds);
};

exports.decrypt = function (password, hash){
    return bcrypt.compareSync(password, hash);
};