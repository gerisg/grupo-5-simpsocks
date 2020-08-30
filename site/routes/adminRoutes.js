const express = require ("express")
const router = express.Router();
const controller= require ("../controllers/adminController")
const adminRoute = require('../middlewares/adminRoute');

router.use(adminRoute);

router.get("/", controller.welcome);

module.exports= router;