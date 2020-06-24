const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const hbs = require('express-handlebars');
const { APP_PORT } = require('./src/const/const');

const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const flash = require('connect-flash');


const { configDB } = require('./src/config/keys');

const app = module.exports = express();
require('./src/lib/passport');


// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', hbs({
    defaultLayout : 'Dashboard',
    extname : '.hbs'
}));

app.set('view engine', 'hbs');

 //Midlewares
 app.use(session({
     secret: 'mi secreto',
     resave: false,
     saveUninitialized: false,
     store: new MySQLStore(configDB)
 }));

 app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', require('./src/routes/index'));
app.use('/Signup', require('./src/routes/auth'));//rutas de login


app.use(passport.initialize());
app.use(passport.session());

//global 

app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    next();
})

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
});

/* error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error/error');
});
*/
// run server
app.listen(APP_PORT, () => {
    console.log(`Server Running in port : ${APP_PORT}`);
});
