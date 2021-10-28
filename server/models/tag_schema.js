const { Schema, model } = require('mongoose');

const tagSchema = new Schema(
  {
    Tag: { type: String }
},
  { timestamps: true },
);

module.exports = model('tag', tagSchema);
