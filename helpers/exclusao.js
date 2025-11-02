const request = require('supertest');
const postLogin = require('../fixtures/postLogin.json')
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')



const excluirAnimal = async (id) => {

    token = await obterToken('admin', 'admin')
    const resposta = await request(process.env.BASE_URL)
      .delete(`animals/${id}`)
      .set('Authorization', `Bearer ${token}`);

      return resposta;
                  
                 

}

module.exports = {
    excluirAnimal
}