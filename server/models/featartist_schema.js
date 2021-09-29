const { Schema, model } = require('mongoose');

const featartistSchema = new Schema(
  {
    ArtistName: { type: String },
    URL: { type: String }
},
  { timestamps: true },
);

module.exports = model('featartist', featartistSchema);
