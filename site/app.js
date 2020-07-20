const express= require ("express");
const app = express();

app.use (express.static("public"));
app.use (express.urlencoded({extended:false}));

app.listen (3000, ()=> (console.log("Servidor funcionando en puerto 3000")));


app.get("/", (req,res) => (res.sendFile(__dirname +"/views/index.html")));

app.get("/cart", (req,res) => (res.sendFile(__dirname +"/views/cart.html")));

app.get("/product", (req,res) => (res.sendFile(__dirname +"/views/product.html")));

app.get("/login", (req,res) => (res.sendFile(__dirname +"/views/login.html")));

app.get("/register", (req,res) => (res.sendFile(__dirname +"/views/register.html")));

// Temporal
app.get("/header", (req,res) => (res.sendFile(__dirname +"/views/partials/header.html")));
app.get("/footer", (req,res) => (res.sendFile(__dirname +"/views/partials/footer.html")));