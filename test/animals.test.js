const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')
const postAnimals = require('../fixtures/postAnimals.json')
const { excluirAnimal } = require('../helpers/exclusao');
const { excluirTodosAnimais } = require('../helpers/exclusaoTotal');

describe('Animals', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('admin', 'admin')
    })

    describe('POST /animals', () => {

       
        it('Deve retornar erro 400 ao se tentar realizar um cadastro com dois animais de mesmo nome e mesmo tutor', async () => {

            const bodyAnimals = { ...postAnimals }


            const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)

            const animal_dois = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)          

            expect(animal_dois.status).to.equal(400);

            
            await excluirTodosAnimais(token);



        })

        it('A idade do animal deve ser um número inteiro', async () => {

            const bodyAnimals = { ...postAnimals }


            const resposta = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)

                
            expect(resposta.status).to.equal(201);
            // Verificando se a idade é um número inteiro
            expect(resposta.body.idade % 1).to.equal(0); 
            
            //const id = resposta.body.id;

            //await excluirAnimal(id);

            await excluirTodosAnimais(token);


            

        })

    })

    describe('GET /animals', () => {
        it('Apenas usuários autenticados podem visualizar a lista de animais', async () => {

            const bodyAnimals = { ...postAnimals }
            const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)
            
            const resposta = await request(process.env.BASE_URL)
                .get('animals')
                //.set('Authorization', `Bearer ${token}`)
                

            expect(resposta.status).to.equal(401);
            //expect(resposta.body).to.be.an('array').that.is.not.empty;
             
            await excluirTodosAnimais(token);

        })

        it('Array deve estar vazio caso não haja animais cadastrados', async () => {

            await excluirTodosAnimais(token);

            const resposta = await request(process.env.BASE_URL)
                .get('animals')
                .set('Authorization', `Bearer ${token}`)
                

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array').that.is.empty;
             
            

        })

    })

    describe('GET /animalsID', () => { 
        it('Deve retornar erro caso o animal solicitado não exista', async () => {

            const id = 99999;
            const resposta = await request(process.env.BASE_URL)
                .get('animals/${id}')
                .set('Authorization', `Bearer ${token}`)

            expect(resposta.status).to.equal(404);
            

            await excluirTodosAnimais(token);
        })    

        it('Apenas usuários autenticados podem realizar a consulta por um animal', async () => {

            const bodyAnimals = { ...postAnimals }
            const animal_um = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)

            const animal_id = animal_um.body.id;

            const resposta = await request(process.env.BASE_URL)
                .get(`animals/${animal_id}`)
                //.set('Authorization', `Bearer ${token}`)
                

            expect(resposta.status).to.equal(401);

            await excluirTodosAnimais(token);
        })


    })

    describe('PUT /animalsID', () => {
         it('Apenas usuários autenticados podem alterar os dados de um animal', async () => {

           
           const bodyAnimals = { ...postAnimals }


            const animal = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)


            const retornoAnimal = animal.body;

            const resposta = await request(process.env.BASE_URL)
                .put('animals/${retornoAnimal.id}')
                .set('Content-Type', 'application/json')
                //.set('Authorization', `Bearer ${token}`)
                .send(retornoAnimal)

            expect(resposta.status).to.equal(401);
            

            await excluirTodosAnimais(token);
        })    

        it('Não deve permitir alterar o nome do animal para um nome já existente para o mesmo tutor', async () => {

           
           const bodyAnimals = { ...postAnimals }

           

            const animalUm = await request(process.env.BASE_URL)
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimals)

            const bodyAnimalsDois = { ...postAnimals }  
            bodyAnimalsDois.nome = "Rex"; // Nome igual ao do primeiro animal

             const animalDois = await request(process.env.BASE_URL)
                
                .post('animals')
                //Passando os headers através do.s 
                .set('Content-Type', 'application/json')
                //Contatenando a variavel token com a palavra inicial Bearer devido ao token ser do tipo Bearer
                .set('Authorization', `Bearer ${token}`)
                .send(bodyAnimalsDois)

            const retornoAnimalDois = animalDois.body;

            animalDois.body.nome = "Maya"; // Tentando alterar para o nome do primeiro animal
            
            const resposta = await request(process.env.BASE_URL)
                .put(`animals/${retornoAnimalDois.id}`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(retornoAnimalDois)

            expect(resposta.status).to.equal(400);
            

            await excluirTodosAnimais(token);
        })    
    
    })

    describe('DELETE /animals{id}', () => { 
        it('Só poderá ser excluído um animal que exista no banco de dados', async () => {
            
            const animal = await request(process.env.BASE_URL)
                .delete('animals/9999999999')
                .set('Authorization', `Bearer ${token}`)

            expect(animal.status).to.equal(404);
        })
                

    })

})            