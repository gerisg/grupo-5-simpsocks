const express= require('express');
const app = express();

// Require routes
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require ("./routes/adminRoutes");
const demoRoutes = require('./routes/demoRoutes');

// Configure
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Define routes
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use ('/admin', adminRoutes)
app.use('/demo', demoRoutes);

// Unknown routes
app.get('*', (req, res) => res.render('error'));

// Start server
app.listen (3000, ()=> (console.log('Server listening (3000)')));