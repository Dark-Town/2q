const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 } // auto-delete after 24hrs
});

module.exports = mongoose.model('Status', StatusSchema);