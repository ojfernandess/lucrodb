require('dotenv').config();  // Carregar as variáveis de ambiente

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Exibir a variável MONGODB_URI para verificar se está sendo lida corretamente
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Conectar ao MongoDB usando a variável de ambiente MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true // Apenas mantenha esta opção
})
.then(() => {
  console.log('Conectado ao MongoDB');
})
.catch((err) => {
  console.error('Erro na conexão com o MongoDB:', err);
});

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
