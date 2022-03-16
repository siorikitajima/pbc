const { Schema, model } = require('mongoose');

const presetSchema = new Schema(
  {
    PresetId: { type: Number },
    PresetName: { type: String },
    PBRhythm: { type: String },
    PBSpeed: { type: String },
    PBMood: { type: String },
    PBExperimental: { type: String },
    PBOrganic: { type: String },
    PBDensity: { type: String },
    Image: { type: String }
},
  { timestamps: true },
);

module.exports = model('preset', presetSchema);
