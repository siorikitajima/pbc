'use strict';

const Playlist = require('../models/playlist_schema');

const readPlaylistData = (req, res) => {
    let id = req.params.id;

    Playlist.findOne({ PlaylistId: id })
        .then((pdata) => {
          res.status(200).json(pdata);
        })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
  };

  const postPlaylistData = (req, res) => {
      Playlist.countDocuments({}, (err, count) => {
        if(err) { res.status(500).json(err); }
        else {
            const playlistEntry = new Playlist({
                PlaylistId: count,
                PlaylistName: req.body.name,
                Songs: req.body.songs
            });
            playlistEntry.save((err) => {
                if(err) { 
                    console.error(err); 
                    res.status(500).json(err);
                } else {
                res.status(200).json(count)
                }
            });
        }
    })
  };
  
  module.exports = {
    readPlaylistData,
    postPlaylistData
  };