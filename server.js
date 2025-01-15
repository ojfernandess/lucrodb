<<<<<<< HEAD
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Importar o CORS
const Profit = require('./models/profitModel');  // Importar o modelo de lucro
const app = express();
const port = process.env.PORT || 3000;

// Usar CORS
app.use(cors());  // Habilitar o CORS para permitir requisições externas
app.use(express.json());  // Middleware para permitir o uso de JSON no corpo das requisições
=======
require('dotenv').config();  // Carregar variáveis de ambiente
const mongoose = require('mongoose');
const express = require('express');
const Profit = require('./models/profitModel');  // Importar o modelo de lucros
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());
>>>>>>> 40f5b19b8230192abbd3a87f0dbd2dce8cc930da

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((err) => {
    console.error('Erro na conexão com o MongoDB:', err);
  });

<<<<<<< HEAD
// Rota para atualizar o lucro
=======
// Exemplo de atualização de lucro e salvamento no MongoDB
>>>>>>> 40f5b19b8230192abbd3a87f0dbd2dce8cc930da
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

<<<<<<< HEAD
=======
// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

>>>>>>> 40f5b19b8230192abbd3a87f0dbd2dce8cc930da
// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
