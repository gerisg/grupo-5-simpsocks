const express= require('express');
const app = express();

// Require routes
const indexRoutes = require('./routes/indexRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const demoRoutes = require('./routes/demoRoutes');
const cartRoutes = require('./routes/cartRoutes');
const adminRoutes = require ("./routes/adminRoutes");


// Configure
app.set('view engine', 'ejs')

// Define routes
app.use(express.static('public'));
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/demo', demoRoutes);
app.use('/cart', cartRoutes);
app.use ("/admin", adminRoutes)

// Unknown routes
app.get('*', (req, res) => res.render('error'));

// Start server
app.listen (3000, ()=> (console.log('Server listening (3000)')));