const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  // openList : {
  //   type: String,
  //   require: true,
  // },
  content: [
    {
      title: {
        type: String,
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'email',
  },
});

const Playlist = mongoose.model('Playlist', userSchema);

module.exports = Playlist;
