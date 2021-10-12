'use strict';

const Artist = require('../models/artist_schema');
const FeatArtist = require('../models/featartist_schema');
// const slugVsNameList = [
//   { 'slug': 'microstructures', 'name': 'Microstructures' },
//   { 'slug': 'the-patternbased-corporation', 'name': 'The PatternBased Corporation' },
//   { 'slug': 'hill-sleepers', 'name': 'Hill Sleepers' },
//   { 'slug': 'joseph-minadeo-and-curt-brown', 'name': 'Joseph Minadeo and Curt Brown' },
//   { 'slug': 'amehuru', 'name': 'Amehuru' },
//   { 'slug': 'joseph-minadeo-and-shinya-sugimoto', 'name': 'Joseph Minadeo and Shinya Sugimoto' },
//   { 'slug': 'onomatopedal', 'name': 'OnomatoPedal' },
//   { 'slug': 'solver', 'name': 'Solver' },
//   { 'slug': 'insect-sounds', 'name': 'Insect Sounds' },
//   { 'slug': 'joseph-minadeo', 'name': 'Joseph Minadeo' },
//   { 'slug': 'low-in-the-sky', 'name': 'Low In The Sky' },
//   { 'slug': 'gnosotros', 'name': 'Gnosotros' },
//   { 'slug': 'tokyo-shapiro', 'name': 'Tokyo Shapiro' },
//   { 'slug': 'joseph-minadeo-and-michael-tolan', 'name': 'Joseph Minadeo and Michael Tolan' },
//   { 'slug': 'puffy-shapes', 'name': 'Puffy Shapes' }
// ]

const readArtistsData = (req, res) => {
    Artist.find()
    .then((data) => {
      // let updatedData = [];
      // for(let a = 0; a < data.length; a++) {
      //   let dataO = data[a].toObject();
      //   const aname = dataO.ArtistName;
      //   let slug = aname.toLowerCase().replace(/\s+/g, '-');
      //   const slugdata = { SlugName: slug }
      //   Object.assign(dataO, slugdata)
      //   updatedData.push(dataO)
      // }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readArtistData = (req, res) => {
  let slug = req.params.slug;
  // let nohyph = slug.replace('-', ' ');
  // let titled = nohyph.replace( /\w\S*/g,
  //   function(txt) {
  //     return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //   }
  // );

  let related = []; ///

  // console.log(titled)
  Artist.findOne({ ArtistSlug: slug, Type: 'A'})
  .then((data) => {
      let dataO = data.toObject();
      // const aname = dataO.ArtistName;
      // let slug = aname.toLowerCase().replace(/\s+/g, '-');
      // const slugdata = { SlugName: slug }
      // Object.assign(dataO, slugdata)

    related = dataO.RelatedEntities.split('; '); ////
    Artist.find({ 'ArtistName': {$in: related}, 'Type': 'P' }) ////
      .then((ardata) => {
        let relatedArray = [];
        for(let a = 0; a < ardata.length; a++) {
            let item = { name: ardata[a].ArtistName, slug: ardata[a].ArtistSlug, img: ardata[a].Img }
            relatedArray.push(item);
        }
        const relatedinfo = {
          RelatedEntities: relatedArray
        }
        Object.assign(dataO, relatedinfo) ////

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
  // let titled;

  let related = []; ///

  // for(let n = 0; n < slugVsNameList.length; n++) {
  //   if(slugVsNameList[n].slug === slug) {
  //     titled = slugVsNameList[n].name
  //   }
  // }
  // console.log(titled)
  Artist.findOne({ ArtistSlug: slug, Type: 'P'})
  .then((data) => {
      let dataO = data.toObject();
      // const aname = dataO.ArtistName;
      // let slug = aname.toLowerCase().replace(/\s+/g, '-');
      // const slugdata = { SlugName: slug }
      // Object.assign(dataO, slugdata)

      related = dataO.RelatedEntities.split('; '); ////
      Artist.find({ 'ArtistName': {$in: related}, 'Type': 'P'}) ////
        .then((ardata) => {
          let relatedArray = [];
          for(let a = 0; a < ardata.length; a++) {
              let item = { name: ardata[a].ArtistName, slug: ardata[a].ArtistSlug, img: ardata[a].Img }
              relatedArray.push(item);
          }
          const relatedinfo = {
            RelatedEntities: relatedArray
          }
          Object.assign(dataO, relatedinfo) ////
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
