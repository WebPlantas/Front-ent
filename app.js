const createError = require('http-errors'),
    express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');

const {
    APP_PORT
} = require('./src/const/const');
//---------Modificacion Andres
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');
const {
    configDB
} = require('./src/config/keys');
const cookieParser = require('cookie-parser');

const app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', hbs({
    defaultLayout: 'Dashboard',
    Layout: 'Admin',
    Layout: 'profesor',
    layoutsDir: path.join(__dirname, 'src/views/layouts'),
    partialsDir: path.join(__dirname, 'src/views/partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));

app.set('view engine', '.hbs');
var sessionStore = new MySQLStore(configDB);
//Midlewares
app.use(cookieParser('mi secreto'));
app.use(session({
    key: 'session_cookie_name',
    secret: 'mi secreto',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'src/public')));

//global 
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//routes
app.use('/', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    //next(createError(404));
});

//  error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.render('error/error');
});
app.use(bodyParser.json());
// run server
app.listen(APP_PORT, () => {
    console.log(`Server Running in port : ${APP_PORT}`);
});