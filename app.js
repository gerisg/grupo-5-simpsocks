const express = require ("express");
const app = express ();
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));


app.listen (3500, ()=> (console.log("Funcionando en Servidor 3500")));


app.get ("/", (req,res) => (res.sendFile(__dirname +"/site/index.html")));

app.get ("/login", (req,res) => (res.sendFile(__dirname +"/site/login.html")));

app.get ("/carrito", (req,res) => (res.sendFile(__dirname +"/site/carrito.html")));

app.get ("/detalleproducto", (req,res) => (res.sendFile(__dirname +"/site/detalleproducto.html")));

app.get ("/register", (req,res) => (res.sendFile(__dirname +"/site/register.html")));

