require('dotenv').config();  // Carregar variáveis de ambiente
const mongoose = require('mongoose');
const express = require('express');
const Profit = require('./models/profitModel');  // Importar o modelo de lucros
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB:', err);
  });

// Exemplo de atualização de lucro e salvamento no MongoDB
app.post('/update-profit', async (req, res) => {
  const { userId, planId, profitAmount } = req.body;

  // Criar um novo documento de lucro
  const newProfit = new Profit({
    userId,
    planId,
    profitAmount
  });

  try {
    // Salvar no MongoDB
    await newProfit.save();
    res.status(200).json({ message: 'Lucro salvo com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar lucro no MongoDB' });
  }
});

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
