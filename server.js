// Carregar as variáveis de ambiente a partir do arquivo .env
require('dotenv').config();

// Importar o Mongoose
const mongoose = require('mongoose');

// Exibir a variável MONGODB_URI para verificar se está sendo lida corretamente
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Configuração do Express (caso você esteja utilizando Express)
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para permitir o uso de JSON no corpo das requisições
app.use(express.json());

// Conectar ao MongoDB usando a variável de ambiente MONGODB_URI
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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
