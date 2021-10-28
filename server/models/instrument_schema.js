const { Schema, model } = require('mongoose');

const instrumentSchema = new Schema(
  {
    Instrument: { type: String }
},
  { timestamps: true },
);

module.exports = model('instrument', instrumentSchema);
