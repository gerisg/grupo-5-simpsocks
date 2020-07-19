const express= require ("express");
const app = express();

app.use (express.static("public"));
app.use (express.urlencoded({extended:false}));

app.listen (3500, ()=> (console.log("Funcionando en puerto 3500")));


app.get ("/", (req,res) => (res.sendFile(__dirname +"/views/index.html")));

app.get ("/carrito", (req,res) => (res.sendFile(__dirname +"/views/carrito.html")));

app.get ("/producto", (req,res) => (res.sendFile(__dirname +"/views/detalleproducto.html")));

app.get ("/login", (req,res) => (res.sendFile(__dirname +"/views/login.html")));

app.get ("/registro", (req,res) => (res.sendFile(__dirname +"/views/register.html")));