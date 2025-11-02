const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postAnimals = require('../fixtures/postAnimals.json')
const postFeedings = require('../fixtures/postFeedings.json')
const { excluirAnimal } = require('../helpers/exclusao');
const { excluirTodosAnimais } = require('../helpers/exclusaoTotal');
const { excluirTodosFeedings } = require('../helpers/excluirFeedings');


describe('Feedings', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('admin', 'admin')
    })

    describe('POST /feedings', () => {
        it('Deve ser possivel registrar uma alimentação para um animal existente', async () => {

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

            const resposta = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)

            expect(resposta.status).to.equal(201);



            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);

        })

        it('Não deve ser possivel registrar uma alimentação para um animal inexistente', async () => {

            const bodyAnimals = { ...postAnimals }


            const animal = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)



            const bodyFeedings = { ...postFeedings }

            bodyFeedings.animalId = animal.body.id + 1;

            const resposta = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)

            expect(resposta.status).to.equal(404);



            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);

        })

        it('Não deve ser possivel registrar uma alimentação para o mesmo animal no mesmo horário', async () => {

            const bodyAnimals = { ...postAnimals }


            const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)




            const bodyFeedings = { ...postFeedings }

            bodyFeedings.animalId = animal_um.body.id

            const alimentacaoUm = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)


            const alimentacaoDois = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)

            expect(alimentacaoDois.status).to.equal(400);



            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);

        })


    })

    describe('GET /feedingsID', () => {
        it('Deve ser retornado um erro 404 caso não haja animal cadastrado com o ID informado', async () => {
            const bodyFeedings = { ...postFeedings }

            const resposta = await request(process.env.BASE_URL)
                .get(`feedings/${bodyFeedings.animalId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(404);


            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);
        })

        it('Deverá retornar um array vazio caso não haja alimentações cadastradas para o animal informado', async () => {

            const bodyAnimals = { ...postAnimals }


            const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)


            const bodyFeedings = { ...postFeedings }

            bodyFeedings.animalId = animal_um.body.id

            const resposta = await request(process.env.BASE_URL)
                .get(`feedings/${bodyFeedings.animalId}`)
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);


            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);
        })





    })

    describe('GET /feedings', () => {
        it('Se não houver nenhum registro de alimentação cadastrado, deve retornar um array vazio com status 200', async () => {

            const bodyFeedings = { ...postFeedings }



            const resposta = await request(process.env.BASE_URL)
                .get(`feedings`)
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(200);

        })

        it('Apenas usuários autenticados podem acessar as alimentações', async () => {

            const bodyFeedings = { ...postFeedings }



            const resposta = await request(process.env.BASE_URL)
                .get(`feedings`)
            //.set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(401);

        })

    })

    describe('DELETE /feedings', () => {
        it('Deve ser possível excluir um registro de alimentação existente', async () => {

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

            const alimentacao = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)


            const resposta = await request(process.env.BASE_URL)
                .delete(`feedings/${alimentacao.body.id}`)
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
            
            expect(resposta.status).to.equal(204);

            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);
                   

        })

        it('Deve ser possível excluir um registro de alimentação existente', async () => {

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

            const alimentacao = await request(process.env.BASE_URL)
                .post('feedings')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyFeedings)

            const alimentacaoID = alimentacao.body.id + 1;    

            const resposta = await request(process.env.BASE_URL)
                .delete(`feedings/${alimentacaoID}`)
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
            
            expect(resposta.status).to.equal(404);

            await excluirTodosAnimais(token);
            await excluirTodosFeedings(token);
                   

        })

    })



})
