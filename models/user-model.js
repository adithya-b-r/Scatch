const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  cart: {
    type: [String],
    default: []
  },
  orders: {
    type: [String],
    default: []
  },
});

module.exports = mongoose.model("user", userSchema);