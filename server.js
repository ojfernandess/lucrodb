require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profit = require('./models/profitModel');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.log('Erro na conexão com o MongoDB:', err));

// Rota para salvar o lucro
app.post('/api/saveProfit', async (req, res) => {
  const { planId, profit, startTime } = req.body;

  try {
    const existingProfit = await Profit.findOne({ planId });

    if (existingProfit) {
      existingProfit.profit = profit;
      existingProfit.startTime = startTime;
      await existingProfit.save();
    } else {
      const newProfit = new Profit({ planId, profit, startTime });
      await newProfit.save();
    }

    res.status(200).json({ message: 'Lucro salvo com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar lucro', error: err });
  }
});

// Rota para obter o lucro
app.get('/api/getProfit', async (req, res) => {
  const { planId } = req.query;

  try {
    const profitData = await Profit.findOne({ planId });

    if (profitData) {
      res.status(200).json({ profit: profitData.profit });
    } else {
      res.status(404).json({ profit: 0 });
    }
  } catch (err) {
    res.status(500).json({ message: 'Erro ao obter lucro', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
