const express = require("express");
const { signup, signin, signout } = require("../../controller/vetting/auth");
const { vetMiddleWare, requireSignin } = require("../../middleware/requirelogin");
const router = express.Router();

router.post("/vetting/signup", signup);

router.post("/vetting/signin", signin);

router.post("/vetting/signout", signout);



module.exports = router;