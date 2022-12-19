require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('./database/mongoose');
app.use(express.json());
const userRouter = require('./routes/user');
const playlistRouter = require('./routes/playlist');
app.use(express.static('public'));

app.use(userRouter);
app.use(playlistRouter);

app.post('/movie', async (req, res) => {
  const movieName = req.body.movieName;
  const baseURL = 'http://www.omdbapi.com/?apikey=';
  const API_KEY = process.env.OMDB_KEY;
  let response;
  try {
    fetch(`${baseURL}${API_KEY}&t=${movieName}`)
      .then((response) => response.json())
      .then((data) => res.send(data));
  } catch (e) {
    console.log(e.message);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
