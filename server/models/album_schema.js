const { Schema, model } = require('mongoose');

const albumSchema = new Schema(
  {
    AlbumID: { type: String },
    Type: { type: String },
    Project: { type: String },
    Title: { type: String },
    Status: { type: String },
    Year: { type: Number },
    Tracks: { type: Number },
    Rate: { type: Number },
    Description: { type: String },
    AlbumArt: { type: String },
    BandcampURL: { type: String },
    SoundcloudURL: { type: String },
    SoundCloudId: { type: String },
    SpotifyId: { type: String },
    SpotifyURL: { type: String },
    AppleMusicURL: { type: String },
    DeezerURL: { type: String },
    TidalURL: { type: String },
    VimeoURL: { type: String },
    YoutubeURL: { type: String }
},
  { timestamps: true },
);

module.exports = model('album', albumSchema);
