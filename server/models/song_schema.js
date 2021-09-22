const { Schema, model } = require('mongoose');

const songSchema = new Schema(
  {
    ID: { type: String },
    Title: { type: String },
    Seq: { type: Number },
    Rate: { type: Number },
    Length: { type: String },
    MusicKey: { type: String },
    BPM: { type: Number },
    BPMExact: { type: String },
    BPMF: { type: Number },
    Grid: { type: String },
    Meter: { type: String },
    ATune: { type: Number },
    PBRhythm: { type: Number },
    PBSpeed: { type: Number },
    PBMood: { type: Number },
    PBExperimental: { type: Number },
    PBOrganic: { type: Number },
    Stems: { type: String },
    Description: { type: String },
    Genre: { type: String },
    SubGenreA: { type: String },
    PrimaryMood: { type: String },
    SecondaryMoods: { type: String },
    Instruments: { type: String },
},
  { timestamps: true },
);

module.exports = model('song', songSchema);
