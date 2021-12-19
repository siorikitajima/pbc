const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema(
  {
    date: { type: String },
    orderIdPB: { type: String },
    description: { type: String },
    items: { type: Array },
    total: { type: Number },
    subtotal: { type: Number },
    discount: { type: String },
    mp3Url: { type: String },
    wavUrl: { type: String },
    name: { type: String },
    email: { type: String },
},
  { timestamps: true },
);

module.exports = model('invoice', invoiceSchema);
