const express = require('express');
const morgan = require('morgan');
const exprhbs= require('express-handlebars');
const path  = require('path');
const session = require('express-session');
const passport = require('passport');
/* const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session');
const {db} = require('./database'); */
// const exphbs = require('express-handlebars');
// const { post } = require('./routes');
//Inicializacion
const app = express();
require('./lib/passport');

//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views'));
app.engine('.hbs',exprhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine','.hbs')
//middlewares
/* app.use(session({
    secret:'appnodeandmysql',
    resave:false,
    saveUninitialized:false,
    store:new MySQLStore(db)

}));
app.use(flash()); */
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//variables globales
app.use((req,res,next)=>{
     //app.locals.success = req.flash('success');
    next();
});


//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));


//Public
app.use(express.static(path.join(__dirname, 'public')));


//Correr el servidor
app.listen(app.get('port'), ()=>{
    console.log('Server On Port');
});