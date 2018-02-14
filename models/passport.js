const passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt        = require('../models/crypto');
      shema         = require('../shema');


passport.use('registration', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd1',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        try{
            let user = await shema.users.findOne({ email: email });
            if (user) {
                return done(null, false, req.flash('message', `Пользователь с почтой ${email} уже существует`));
            }
            if (!user) {
                password = bcrypt.encrypt(password);
                let data = new shema.users({email: email, password: password});
                user = await data.save(data);
                return done(null, user);
            }
        }catch(err){
            return done(err);
        }
    }
));

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'pwd',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        try{
            let user = await shema.users.findOne({ email: email });
            if (user) {
                if(bcrypt.decrypt(password, user.password)){
                    return done(null, user);
                }else{
                    return done(null, false, req.flash('message', `Не верный пароль!`));
                }
            }
            if (!user) {
                return done(null, false, req.flash('message', `Пользователь ${email} не найден`));
            }
        }catch(err){
            return done(err);
        }
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    shema.users.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;