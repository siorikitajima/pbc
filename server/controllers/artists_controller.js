'use strict';

const Artist = require('../models/artist_schema');
const FeatArtist = require('../models/featartist_schema');

const readArtistsData = (req, res) => {
    Artist.find()
    .then((data) => {
      let updatedData = [];
      for(let a = 0; a < data.length; a++) {
        let dataO = data[a].toObject();
        const aname = dataO.ArtistName;
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

const readArtistData = (req, res) => {
  let slug = req.params.slug;
  let nohyph = slug.replace('-', ' ');
  let titled = nohyph.replace( /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
  console.log(titled)
  Artist.findOne({ ArtistName: titled, Type: 'A'})
  .then((data) => {
      let dataO = data.toObject();
      const aname = dataO.ArtistName;
      let slug = aname.toLowerCase().replace(/\s+/g, '-');
      const slugdata = { SlugName: slug }
      Object.assign(dataO, slugdata)
    res.status(200).json(dataO);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
};

const readProjectData = (req, res) => {
  let slug = req.params.slug;
  let nohyph = slug.replace('-', ' ');
  let titled = nohyph.replace( /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
  console.log(titled)
  Artist.findOne({ ArtistName: titled, Type: 'P'})
  .then((data) => {
      let dataO = data.toObject();
      const aname = dataO.ArtistName;
      let slug = aname.toLowerCase().replace(/\s+/g, '-');
      const slugdata = { SlugName: slug }
      Object.assign(dataO, slugdata)
    res.status(200).json(dataO);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
};

const readFeatArtistData = (req, res) => {
  FeatArtist.find()
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
};

module.exports = {
  readArtistsData,
  readArtistData,
  readProjectData,
  readFeatArtistData
};
