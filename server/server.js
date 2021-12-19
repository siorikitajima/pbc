const cors = require('cors');
const express = require('express');

require('dotenv').config();

require("./helpers/db/mongodb.js")();

const port = process.env.PORT || 9000;

const app = express();

app.use(cors());
app.use(express.json());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

app.use('/api', require('./routes/song_api'));
app.use('/api', require('./routes/album_api'));
app.use('/api', require('./routes/artist_api'));
app.use('/api', require('./routes/search_api'));
app.use('/api', require('./routes/license_api'));
app.use('/api', require('./routes/playlist_api'));
app.use('/api', require('./routes/mail_api'));

app.listen(port);
console.log(`Omar listening on ${port}`);

module.exports = app;
