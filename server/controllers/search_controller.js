'use strict';

const Song = require('../models/song_schema');
const Artist = require('../models/artist_schema');
const Album = require('../models/album_schema');
const Preset = require('../models/preset_schema');
const Instrument = require('../models/instrument_schema');
const Genre = require('../models/genre_schema');
const Tag = require('../models/tag_schema');
const Mood = require('../models/mood_schema');

const readSearchData = (req, res) => {
  let keys = [];
    Artist.find() //// Artist Names with Type
    .then((artist) => {
        for(let s = 0; s < artist.length; s++) {
            let type;
            if (artist[s].Show === 'Y') {
                if (artist[s].Type === 'V') { type = 'visual' }
                else if (artist[s].Type === 'A') { type = 'artist' }
                else { type = 'project' }
                const artistkey = {
                "key": artist[s].ArtistName,
                "type": type,
                "id": artist[s].ArtistSlug
                }
                keys.push(artistkey)
            }
        }
        Album.find() //// Album Names
        .then((album) => {
            for(let al = 0; al < album.length; al++) {
                const albumkey = {
                "key": album[al].Title,
                "type": 'album',
                "id": album[al].AlbumID
                }
                keys.push(albumkey)
            }
            Song.find().sort({Rate: -1}) //// Song Names
            .then((data) => {
                for(let s = 0; s < data.length; s++) {
                    const songkey = {
                    "key": data[s].Title,
                    "type": 'song',
                    "id": data[s].ID
                    }
                    keys.push(songkey)
                }
                Instrument.find().then((instrument) => {
                    for(let i = 0; i < instrument.length; i++) {
                        const instrumentkey = {
                        "key": instrument[i].Instrument,
                        "type": 'instrument'
                        }
                        keys.push(instrumentkey)
                    }
                    Genre.find().then((genre) => {
                        for(let g = 0; g < genre.length; g++) {
                            const genrekey = {
                            "key": genre[g].Genre,
                            "type": 'genre'
                            }
                            keys.push(genrekey)
                        }
                        Tag.find().then((tag) => {
                            for(let t = 0; t < tag.length; t++) {
                                const tagkey = {
                                "key": tag[t].Tag,
                                "type": 'tag'
                                }
                                keys.push(tagkey)
                            }
                            Mood.find().then((mood) => {
                                for(let m = 0; m < mood.length; m++) {
                                    const moodkey = {
                                    "key": mood[m].Mood,
                                    "type": 'mood'
                                    }
                                    keys.push(moodkey)
                                }
                                res.status(200).json(keys);
                            })
                        })
                    })
                })
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
