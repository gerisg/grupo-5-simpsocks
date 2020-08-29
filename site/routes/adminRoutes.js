const express = require ("express")
const router = express.Router();
const controller= require ("../controllers/adminController")
const adminRoute = require('../middlewares/adminRoute');

router.get("/", adminRoute, controller.welcome)

module.exports= router;