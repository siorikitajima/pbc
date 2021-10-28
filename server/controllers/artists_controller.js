'use strict';

const Artist = require('../models/artist_schema');
const FeatArtist = require('../models/featartist_schema');

const readArtistsData = (req, res) => {
    Artist.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readArtistData = (req, res) => {
  let slug = req.params.slug;
  let related = [];

  Artist.findOne({ ArtistSlug: slug, Type: 'A'})
  .then((data) => {
    //// Get Related Artists' data
    let dataO = data.toObject();
    related = dataO.RelatedEntities.split('; ');
    Artist.find({ 'ArtistName': {$in: related}, 'Type': 'P' })
      .then((ardata) => {
        let relatedArray = [];
        for(let a = 0; a < ardata.length; a++) {
            let item = { name: ardata[a].ArtistName, slug: ardata[a].ArtistSlug, img: ardata[a].Img }
            relatedArray.push(item);
        }
        const relatedinfo = {
          RelatedEntities: relatedArray
        }
        Object.assign(dataO, relatedinfo)
        res.status(200).json(dataO);
      })
  })
  .catch((err) => {
    console.error(err);
    res.status(500).json(err);
  });
};

const readProjectData = (req, res) => {
  let slug = req.params.slug;
  let related = [];
  Artist.findOne({ ArtistSlug: slug, Type: 'P'})
  .then((data) => {
      //// Get Related Artists' data
      let dataO = data.toObject();
      related = dataO.RelatedEntities.split('; ');
      Artist.find({ 'ArtistName': {$in: related}, 'Type': 'P'})
        .then((ardata) => {
          let relatedArray = [];
          for(let a = 0; a < ardata.length; a++) {
              let item = { name: ardata[a].ArtistName, slug: ardata[a].ArtistSlug, img: ardata[a].Img }
              relatedArray.push(item);
          }
          const relatedinfo = {
            RelatedEntities: relatedArray
          }
          Object.assign(dataO, relatedinfo)
          res.status(200).json(dataO);
        })
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
