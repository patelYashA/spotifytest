var express = require('express');
var router = express.Router();
const apiRoutes = require("./api");
const publicRoutes = require("./api/public/index");
const privateRoutes = require("./api/private/index")
const authentication = require("../middleware/authentication");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json("API working")
});

router.use(publicRoutes);

router.use(authentication);

router.use(privateRoutes);

module.exports = router;
