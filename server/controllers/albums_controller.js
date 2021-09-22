'use strict';

const Album = require('../models/album_schema');

const readAlbumData = (req, res) => {
   Album.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
    readAlbumData
};
