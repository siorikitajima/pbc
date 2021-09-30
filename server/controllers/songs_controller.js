'use strict';

const Song = require('../models/song_schema');

const readSongsData = (req, res) => {
  Song.find().sort({Rate: -1})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readSongData = (req, res) => {
  let id = req.params.id
  Song.findOne({ 'ID': id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  readSongsData,
  readSongData
};
