const express= require ("express");
const app = express();

app.use (express.static("public"));
app.use (express.urlencoded({extended:false}));

app.listen (3000, ()=> (console.log("Servidor funcionando en puerto 3000")));


app.get("/", (req,res) => (res.sendFile(__dirname +"/views/index.html")));

app.get("/cart", (req,res) => (res.sendFile(__dirname +"/views/cart.html")));

app.get("/product-detail", (req,res) => (res.sendFile(__dirname +"/views/product.html")));

app.get("/login", (req,res) => (res.sendFile(__dirname +"/views/login.html")));

app.get("/register", (req,res) => (res.sendFile(__dirname +"/views/register.html")));

app.get("/recover", (req,res) => (res.sendFile(__dirname +"/views/recover.html")));

// Temporal
app.get("/forms", (req,res) => (res.sendFile(__dirname +"/views/partials/forms.html")));
app.get("/header", (req,res) => (res.sendFile(__dirname +"/views/partials/header.html")));
app.get("/footer", (req,res) => (res.sendFile(__dirname +"/views/partials/footer.html")));
app.get("/grid", (req,res) => (res.sendFile(__dirname +"/views/partials/grid.html")));