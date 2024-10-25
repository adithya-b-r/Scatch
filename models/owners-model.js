const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: String,
  products: {
    type: [String],
    default: []
  },
});

module.exports = mongoose.model("owner", ownerSchema);