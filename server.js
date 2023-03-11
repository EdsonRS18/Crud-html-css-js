const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/form', (req, res) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const plano = req.body.plano
  console.log(`nome: ${nome}, cpf: ${cpf},plano: ${plano}`);
  
});

app.put('/put', (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const plano = req.body.plano
    console.log(`nome: ${nome}, cpf: ${cpf},plano: ${plano}`);
    res.send('Informações atualizadas com sucesso!');
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}.`);
});