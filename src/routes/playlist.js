const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const auth = require('../middlewares/auth');

router.post('/create-playlist', auth, async (req, res) => {
  const { title } = req.body;
  const isUser = req.user._id;
  try {
    if (isUser) {
      const playlist = new Playlist({
        owner: isUser.valueOf(),
        title,
      });
      playlist.save();
      res.status(200).send({ message: 'Playlist created' });
    }
  } catch (error) {
    console.log('error in playlist.js:', error);
  }
});

router.get('/playlist-list', auth, async (req, res) => {
  const user = req.user._id;
  console.log('/playlist-list user: ', user);
  try {
    const data = await Playlist.find({
      owner: mongoose.Types.ObjectId(user),
    });
    // .select({ _id: 1, title: 1, content: 1 });
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log('/home in playlist: ', error);
  }
});

router.get('/public-list',auth,async (req, res) => {
  try {
    const data = await Playlist.find({ openList: 'yes' });
    // .select({ , title: 1 });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
});

router.post('/playlist-movies', async (req, res) => {
  const { id } = req.body;
  try {
    const list = await Playlist.findById(mongoose.Types.ObjectId(id));
    console.log(list);
    await res.status(200).send(list);
  } catch (error) {
    console.log(error);
  }
});

router.post('/concat-list', auth, async (req, res) => {
  const { objectId, movieToAdd } = req.body;
  console.log('movieToAdd: ', movieToAdd);
  console.log('objectId: ', objectId);
  try {
    const playlist = await Playlist.findById(mongoose.Types.ObjectId(objectId));
    console.log(playlist);
    console.log(playlist.content);
    playlist.content = playlist.content.concat({ title: movieToAdd });
    await playlist.save();
    res.status(200).send({ message: 'Added to playlist.' });
  } catch (e) {
    console.log(e);
  }
});

router.get('/aplaylist/:id', async (req, res) => {
  console.log('req.params: ', req.params.id);
  const deta = req.params.id;

  try {
    const requestedData = await Playlist.findById(mongoose.Types.ObjectId(deta));
    console.log(requestedData)
    res.status(200).send(requestedData);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
