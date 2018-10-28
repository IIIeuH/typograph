const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');
const sockets = require('./sockets');
const session = require('express-session');
const routes = require('./routes/index');
const passport = require('./models/passport');
const flash        = require('req-flash');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const compression = require('compression');
const ctrl = require('./ctrl/index');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    sockets.init(socket);
});

app.locals.moment = require('moment');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'soap fragrant',
    store: new MongoStore(config.session),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);




http.listen(config.port, function(){
    console.log('Server is listen on port '+ config.port);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   let err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   console.log(err);
//   req.flash('err', err);
//   res.render('error', {
//     message: err.message,
//     error: err,
//     user: req.user
//   });
// });


module.exports = app;
module.exports = io;
