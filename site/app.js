const express= require('express');
const app = express();
const methodOverride = require('method-override');

// Routers
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require ("./routes/adminRoutes");
const demoRoutes = require('./routes/demoRoutes');

// Configuration
app.set('view engine', 'ejs'); // views extension ejs
app.use(express.static('public')); // template engines
app.use(express.urlencoded({ extended: false })); // put json into body
app.use(methodOverride('_method')); // replace POST methods by parametrized '_method'

// Routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use ("/admin", adminRoutes)
app.use('/demo', demoRoutes);
app.get('*', (req, res) => res.render('error')); // unknown

// Start server
app.listen (3000, ()=> (console.log('Server listening (3000)')));