'use strict';

const Album = require('../models/album_schema');

const readAlbumsData = (req, res) => {
   Album.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readAlbumData = (req, res) => {
  let id = req.params.id
  Album.find({ 'AlbumID' : id })
   .then((data) => {
     res.status(200).json(data);
   })
   .catch((err) => {
     console.error(err);
     res.status(500).json(err);
   });
};

module.exports = {
    readAlbumsData,
    readAlbumData
};
