const express = require ("express")
const router = express.Router();
const controller= require ("../controllers/adminController")

router.get("/", controller.welcome)

router.get("/create", controller.create)

router.get ("/edit", controller.edit)


module.exports= router;