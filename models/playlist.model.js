const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        name: {
            type: String
        },
        description: {
            type: String
        },
        songs: {
            type: [String]
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const PlaylistModel = mongoose.model("playlist", PlaylistSchema);

module.exports = PlaylistModel;
