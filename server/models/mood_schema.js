const { Schema, model } = require('mongoose');

const moodSchema = new Schema(
  {
    Mood: { type: String }
},
  { timestamps: true },
);

module.exports = model('mood', moodSchema);
