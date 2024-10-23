const mongoose = require('mongoose');
const dbgr = require('debug')("development:mongoose"); //export DEBUG=development:*
const config = require('config');

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(() => {
  dbgr("Connected to MongoDB");
})
.catch((err) => {
  dbgr("Error: "+err);
});

module.exports = mongoose.connection;