const { Schema, model } = require('mongoose');

const genreSchema = new Schema(
  {
    Genre: { type: String }
},
  { timestamps: true },
);

module.exports = model('genre', genreSchema);
