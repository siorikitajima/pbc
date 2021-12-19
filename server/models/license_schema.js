const { Schema, model } = require('mongoose');

const licenseSchema = new Schema(
  {
    id: { type: Number },
    name: { type: String },
    steps: { type: String },
    category: { type: String },
    categorySlug: { type: String },
    type: { type: String },
    typeSlug: { type: String },
    typeDesc: { type: String },
    subtype: { type: String },
    subtypeSlug: { type: String },
    price: { type: String },
    permitted: { type: String },
    nonPermitted: { type: String },
    spots: { type: String },
    usage: { type: String },
    lifespan: { type: String },
    notes: { type: String }
},
  { timestamps: true },
);

module.exports = model('license', licenseSchema);
