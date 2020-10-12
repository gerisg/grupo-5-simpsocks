const express= require('express');
const app = express();
const methodOverride = require('method-override');
const session = require ('express-session');
const cookieParser = require('cookie-parser');
const auth = require('./middlewares/auth');

// Routers
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const siteRoutes = require('./routes/siteRoutes');
const apiRoutes = require('./routes/apiRoutes');

// Configuration
app.set('view engine', 'ejs'); // views extension ejs
app.use(express.static('public')); // template engines
app.use(express.urlencoded({ extended: false })); // put json into body
app.use(methodOverride('_method')); // replace POST methods by parametrized '_method'
app.use(session({
    secret:'dh_simp_socks',
    resave: false,
    saveUninitialized:true,
}));
app.use(cookieParser());
app.use(auth);

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/site', siteRoutes);
app.use('/api', apiRoutes);

// Errors
app.use((req, res, next) => {
    res.status(404).render('error-404');
    next();
});

// Start server
app.listen (3000, ()=> (console.log('Server listening (3000)')));