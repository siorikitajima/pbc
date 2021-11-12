const { Schema, model } = require('mongoose');

const playlistSchema = new Schema(
  {
    PlaylistId: { type: Number },
    PlaylistName: { type: String },
    Songs: { type: Array }
},
  { timestamps: true },
);

module.exports = model('playlist', playlistSchema);
