const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true
  },
  email: String,
  password: String,
  cart: {
    type: String,
    default: []
  },
  isadmin: Boolean,
  order: {
    type: String,
    default: []
  },
  contact: Number,
  picture: String,
});

model.exports = mongoose.model("user", userSchema);