const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postAnimals = require('../fixtures/postAnimals.json')
const postFeedings = require('../fixtures/postFeedings.json')
const { excluirAnimal } = require('../helpers/exclusao');
const { excluirTodosAnimais } = require('../helpers/exclusaoTotal');


 describe('Animals', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('admin', 'admin')
    })

    describe('POST /feedings', () => {
          it('Deve retornar erro 400 ao se tentar realizar um cadastro com dois animais de mesmo nome e mesmo tutor', async () => {

            const bodyAnimals = { ...postAnimals }


            const animal = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)

                                   


             const bodyFeedings = { ...postFeedings }

             bodyFeedings.animalId = animal.body.id

             const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)

                expect(animal_dois.status).to.equal(400);



             await excluirTodosAnimais(token);

          })


    })    



 })
