'use strict';

const Artist = require('../models/artist_schema');

const readArtistData = (req, res) => {
    Artist.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
    readArtistData
};
