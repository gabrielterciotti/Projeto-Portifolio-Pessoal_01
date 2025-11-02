const request = require('supertest');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao');

/**
 * Exclui todos os registros de feedings gerados durante o teste.
 * @param {string} token - Token JWT de autenticação.
 */
async function excluirTodosFeedings(token) {
  // Buscar todos os registros de alimentação
  const resposta = await request(process.env.BASE_URL)
    .get('feedings')
    .set('Authorization', `Bearer ${token}`);

  if (resposta.status !== 200 || !Array.isArray(resposta.body)) {
    throw new Error('Falha ao buscar alimentações');
  }

  // Excluir cada registro de alimentação encontrado
  for (const feeding of resposta.body) {
    await request(process.env.BASE_URL)
      .delete(`feedings/${feeding.id}`)
      .set('Authorization', `Bearer ${token}`);
  }
}

module.exports = { excluirTodosFeedings };