var express = require('express');
var router = express.Router();
const playlistCtrl  = require("../../../controllers/playlist.controller")

router.post("/createplaylist", playlistCtrl.createPlaylist);
router.get("/getalluserplaylists", playlistCtrl.getAllUserPlaylists);
router.post("/:playlistId/addsong", playlistCtrl.addSong);
router.get("/:playlistId/getplaylist", playlistCtrl.getPlaylist);
router.put("/:playlistId/updateplaylist", playlistCtrl.updatePlaylist);
router.delete("/:playlistId/deleteplaylist", playlistCtrl.deletePlaylist);

module.exports = router;
