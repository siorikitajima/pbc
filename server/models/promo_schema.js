const { Schema, model } = require('mongoose');

const promoSchema = new Schema(
  {
    Code: { type: String },
    DiscMethod: { type: String },
    DiscValue: { type: String },
    ExpMethod: { type: String },
    ExpValue: { type: String },
    Agent: { type: String }
},
  { timestamps: true },
);

module.exports = model('promo', promoSchema);
