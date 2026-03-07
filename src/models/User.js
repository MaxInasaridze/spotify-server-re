const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [40, "Name should not be more than 40 character"],
      minlength: [2, "Name should be at least 2 character"],
    },
    email: {
      type: String,
      required: [true, "Please provide a email"],
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
      required: [true, "Please provide a password"],
      minlength: [6, "Password should be at least 6 character"],
    },
    profilePicture: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    likedSongs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    likedAlbums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
    followedArtists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
      },
    ],
    followedPlaylists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist",
      },
    ],
  },
  {
    timestamps: true,
  },
);


userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function() {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



const User = mongoose.model("User", userSchema);
module.exports = User;
