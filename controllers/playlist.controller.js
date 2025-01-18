const PlaylistModel = require("../models/playlist.model");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");

exports.createPlaylist = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { _id: userId } = req.user;
        const NewPlaylist = new PlaylistModel({
            name,
            description,
            userId,
        });
        const playlist = await NewPlaylist.save();
        sendSuccessResponse(res, { data: playlist });
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.getAllUserPlaylists = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const  playlists = await PlaylistModel.find({ userId });
        sendSuccessResponse(res, { data: playlists });
    } catch (error) {
        sendErrorResponse(res, error.message);  
    }
}

exports.addSong = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const { song } = req.body;
        const playlist = await PlaylistModel.findById(playlistId);
        playlist.songs = [...playlist?.songs, song];
        const addedSong = await playlist.save();
        sendSuccessResponse(res, { data: addedSong })
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.getPlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const Playlist = await PlaylistModel.findById(playlistId);
        sendSuccessResponse(res, { data: Playlist })
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.updatePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        let columns = Object.keys(req.body);
        let columnNames = columns.map((val) => {
            return { [val]: req.body[val] };
        });
        const mergedObject = columnNames.reduce((result, currentObject) => {
            return { ...result, ...currentObject };
        }, {});
        const updatePlaylist = await PlaylistModel.findByIdAndUpdate(
            playlistId,
            mergedObject,
            {
                new: true
            }
        );
        sendSuccessResponse(res, { data: updatePlaylist })
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}

exports.deletePlaylist = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const deletePlaylist = await PlaylistModel.findByIdAndDelete(playlistId);
        sendSuccessResponse(res, { data: "Playlist deleted" })
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
}