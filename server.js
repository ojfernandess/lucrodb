// Importa as dependências
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // Carrega as variáveis do arquivo .env

// Configuração do app Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware para lidar com JSON
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI não está definida");
  process.exit(1);  // Encerra o processo se a URI não estiver definida
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso!");
  })
  .catch(err => {
    console.error("Erro na conexão com o MongoDB:", err);
  });

// Importar o modelo do Profit
const Profit = require('./models/profitModel');

// Rota para salvar o lucro
app.post('/api/saveProfit', async (req, res) => {
  try {
    const { planId, profit, startTime } = req.body;

    // Cria ou atualiza o lucro no banco de dados
    const existingProfit = await Profit.findOne({ planId });

    if (existingProfit) {
      existingProfit.profit = profit;
      existingProfit.startTime = startTime;
      await existingProfit.save();
    } else {
      const newProfit = new Profit({
        planId,
        profit,
        startTime,
      });
      await newProfit.save();
    }

    res.status(200).json({ message: 'Lucro salvo com sucesso!' });
  } catch (error) {
    console.error("Erro ao salvar o lucro:", error);
    res.status(500).json({ error: 'Erro ao salvar os dados no servidor' });
  }
});

// Rota para obter o lucro
app.get('/api/getProfit', async (req, res) => {
  try {
    const { planId } = req.query;

    // Busca o lucro do banco de dados
    const profit = await Profit.findOne({ planId });

    if (!profit) {
      return res.status(404).json({ message: 'Lucro não encontrado' });
    }

    res.status(200).json({ profit: profit.profit });
  } catch (error) {
    console.error("Erro ao obter o lucro:", error);
    res.status(500).json({ error: 'Erro ao buscar os dados no servidor' });
  }
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
