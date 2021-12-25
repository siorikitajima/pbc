'use strict';

const Song = require('../models/song_schema');
const Album = require('../models/album_schema');
const Artist = require('../models/artist_schema');

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

const readSingleSongData = (req, res) => {
  let id = req.params.id;
  let albumId, artistName, slugArtistName;
  let writers = []; 
  let singleSongData = {};
  Song.findOne({ 'ID': id })
    .then((data) => {
      albumId = data.CatNum;
      artistName = data.ArtistName;
      writers = data.WriterSlug.split(',');
      singleSongData = data.toObject();
      slugArtistName = artistName.toLowerCase().replace(/\s+/g, '-');
      let slugTitle = data.Title.toLowerCase().replace(/\s+/g, '-');
      singleSongData.slugArtistName = slugArtistName;
      singleSongData.slugTitle = slugTitle;
  Album.findOne({ 'AlbumID': albumId })
      .then((aldata) => {
        singleSongData.Year = aldata.Year;
      Artist.find({ 'ArtistSlug': {$in: writers} })
        .then((ardata) => {
          let writeArray = [];
          let pimage;
          for(let a = 0; a < ardata.length; a++) {
            if(ardata[a].Type == 'A') {
              let item = { name: ardata[a].ArtistName, slug: ardata[a].ArtistSlug, img: ardata[a].Img }
              writeArray.push(item);
            }
          }
          singleSongData.Writers = writeArray;

        Artist.find({ 'ArtistSlug': slugArtistName, 'Type': 'P' })
          .then((imgdata) => {

            for(let a = 0; a < imgdata.length; a++) {
            pimage = imgdata[a].Img;
            }
          singleSongData.ArtistImage = pimage;
          res.status(200).json(singleSongData)
        })
      })
    })
  })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readSongNames = (req, res) => {
  Song.find().sort({Rate: -1})
    .then((data) => {
      let songNames = [];
      for(let s = 0; s < data.length; s++) {
        let asong = { Title: data[s].Title, ID: data[s].ID, CatNum: data[s].CatNum, ArtistName: data[s].ArtistName };
        songNames.push(asong)
      }
      res.status(200).json(songNames);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  readSongsData,
  readSongData,
  readSingleSongData,
  readSongNames
};
