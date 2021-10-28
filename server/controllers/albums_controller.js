'use strict';

const Album = require('../models/album_schema');
const Artist = require('../models/artist_schema');

const readAlbumsData = (req, res) => {
   Album.find()
    .then((data) => {
      //// Adding Slug name for the title
      let updatedData = [];
      for(let a = 0; a < data.length; a++) {
        let dataO = data[a].toObject();
        const aname = dataO.Title;
        let slug = aname.toLowerCase().replace(/\s+/g, '-');
        const slugdata = { SlugName: slug }
        Object.assign(dataO, slugdata)
        updatedData.push(dataO)
      }
      res.status(200).json(updatedData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readAlbumData = (req, res) => {
  let id = req.params.id;
  Album.find({ 'AlbumID' : id })
   .then((data) => {
    //// Adding Slug name for the project + visual artist
    let tempAlbum = data[0].toObject();
    let slugProject = tempAlbum.Project.toLowerCase().replace(/\s+/g, '-');
    let coverArt = tempAlbum.AlbumArt.toLowerCase().replace(/\s+/g, '-');
    Artist.find({ 'ArtistSlug': coverArt, 'Type': 'V'} )
     .then((vdata) => {
      let url = vdata[0].URL;
       tempAlbum.coverLink = url;
       tempAlbum.ArtistSlug = slugProject;
       res.status(200).json(tempAlbum);
     })
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
