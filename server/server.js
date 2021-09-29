// Importing required modules
const cors = require('cors');
const express = require('express');

// parse env variables
require('dotenv').config();

require("./helpers/db/mongodb.js")();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
// app.use('/api', require('./routes/api'));
app.use('/api', require('./routes/song_api'));
app.use('/api', require('./routes/album_api'));
app.use('/api', require('./routes/artist_api'));
app.use('/api', require('./routes/search_api'));

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
