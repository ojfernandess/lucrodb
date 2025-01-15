const mongoose = require('mongoose');

const profitSchema = new mongoose.Schema({
  planId: { type: String, required: true, unique: true },
  profit: { type: Number, required: true },
  startTime: { type: Number, required: true }
});

const Profit = mongoose.model('Profit', profitSchema);

module.exports = Profit;
