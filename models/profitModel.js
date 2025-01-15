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
