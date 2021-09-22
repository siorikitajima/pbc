const { Schema, model } = require('mongoose');

const artistSchema = new Schema(
  {
    ID: { type: String },
    Type: { type: String },
    Show: { type: Boolean },
    ArtistName: { type: String },
    Bio: { type: String },
    RelatedEntities: { type: String },
    FeaturedSongs: { type: String },
    FirstCollab: { type: String },
    URL: { type: String },
    BandcampURL: { type: String },
    SoundcloudURL: { type: String },
    InstagramURL: { type: String },
    SpotifyURL: { type: String },
    Img: { type: String },
    Contacted: { type: String },
    Imgattr: { type: String }
},
  { timestamps: true },
);

module.exports = model('artist', artistSchema);
