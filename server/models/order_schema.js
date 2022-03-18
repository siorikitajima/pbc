const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    date: { type: String },
    orderIdPB: { type: String },
    paymentId: { type: String },
    payer: { type: Object },
    purchase_units: { type: Array },
    description: { type: String },
    items: { type: Array },
    total: { type: Number },
    subtotal: { type: Number },
    discount: { type: String },
    promoCode: { type: String },
    status: { type: String },
    mp3Url: { type: String },
    wavUrl: { type: String }
},
  { timestamps: true },
);

module.exports = model('order', orderSchema);
