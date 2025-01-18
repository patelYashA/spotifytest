var express = require('express');
var router = express.Router();
const authCtrl = require("../../../controllers/auth.controller");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
