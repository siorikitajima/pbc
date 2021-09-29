'use strict';

const Song = require('../models/song_schema');
const Artist = require('../models/artist_schema');
const Album = require('../models/album_schema');
const Preset = require('../models/preset_schema');

const readSearchData = (req, res) => {
  let keys = [];
    Artist.find()
    .then((artist) => {
        for(let s = 0; s < artist.length; s++) {
            let type;
            if (artist[s].Show === 'Y') {
                if (artist[s].Type === 'V') { type = 'visual' }
                else if (artist[s].Type === 'A') { type = 'artist' }
                else { type = 'project' }
                const artistkey = {
                "key": artist[s].ArtistName,
                "type": type
                }
                keys.push(artistkey)
            }
        }
        Album.find()
        .then((album) => {
            for(let al = 0; al < album.length; al++) {
                const albumkey = {
                "key": album[al].Title,
                "type": 'album'
                }
                keys.push(albumkey)
            }
            Song.find().sort({Rate: -1})
            .then((data) => {
                for(let s = 0; s < data.length; s++) {
                    const songkey = {
                    "key": data[s].Title,
                    "type": 'song'
                    }
                    keys.push(songkey)
                }
                res.status(200).json(keys);
            })
        })
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readPresetData = (req, res) => {
    Preset.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
}

module.exports = {
   readSearchData,
   readPresetData
};
