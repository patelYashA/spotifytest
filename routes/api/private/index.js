var express = require('express');
var router = express.Router();
const playlistRoutes = require("./playlist")

router.use("/playlist", playlistRoutes);

module.exports = router;
