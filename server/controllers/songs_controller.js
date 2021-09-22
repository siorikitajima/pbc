'use strict';

const Song = require('../models/song_schema');

const readSongData = (req, res) => {
  Song.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  readSongData
};
