const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
            maxlenght: [40, "Name cannot be more than 40 characters"],
            minlenght: [2, "Name cannot be less than 2 characters"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please provide a valid email",
            ],
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedSongs: {},
        likedAlbums: {},
        followedArtists: {},
        followedPlaylists: {},
    },

    
    
    {
    timestamps: true,
    },
)

const User = mongoose.model("User", UserSchema);
module.exports = User;