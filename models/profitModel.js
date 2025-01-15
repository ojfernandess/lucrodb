<<<<<<< HEAD
const mongoose = require('mongoose');

const profitSchema = new mongoose.Schema({
  planId: { type: String, required: true, unique: true },
  profit: { type: Number, required: true },
  startTime: { type: Number, required: true }
});

const Profit = mongoose.model('Profit', profitSchema);

module.exports = Profit;
=======
const mongoose = require('mongoose');

// Definir o esquema de lucro
const profitSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  planId: {
    type: String,
    required: true
  },
  profitAmount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Criar o modelo com base no esquema
const Profit = mongoose.model('Profit', profitSchema);

module.exports = Profit;
>>>>>>> 40f5b19b8230192abbd3a87f0dbd2dce8cc930da
