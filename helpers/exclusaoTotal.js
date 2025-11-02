const request = require('supertest');
require('dotenv').config();

async function excluirTodosAnimais(token) {
    
  // Buscar todos os animais
  const resposta = await request(process.env.BASE_URL)
    .get('animals')
    .set('Authorization', `Bearer ${token}`);

  if (resposta.status !== 200 || !Array.isArray(resposta.body)) {
    throw new Error('Falha ao buscar animais');
  }

  // Excluir cada animal encontrado
  for (const animal of resposta.body) {
    await request(process.env.BASE_URL)
      .delete(`animals/${animal.id}`)
      .set('Authorization', `Bearer ${token}`);
  }
}

module.exports = { excluirTodosAnimais };