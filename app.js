const createError = require('http-errors'),
express = require('express'),
path = require('path'),
logger = require('morgan'),
hbs = require('express-handlebars');

const { APP_PORT } = require('./src/const/const');

const app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', hbs({
    defaultLayout : 'Dashboard',
    layoutsDir : path.join(__dirname, 'src/views/layouts'),
    partialsDir : path.join(__dirname, 'src/views/partials'),
    extname : '.hbs'
}));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', require('./src/routes/index'));    

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    next(createError(404));
});

//  error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') == 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error/error');
});

// run server
app.listen(APP_PORT, () => {
    console.log(`Server Running in port : ${APP_PORT}`);
});