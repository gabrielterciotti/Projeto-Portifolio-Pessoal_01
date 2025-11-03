const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const postLogin = require('../../fixtures/postLogin.json')



describe('Login', () => {
    describe('POST /auth/login', () => {
        it('Deve retornar 200 com token em string quando usar credenciais validas ', async () => { 
            const bodyLogin ={ ...postLogin }

            const resposta = await request(process.env.BASE_URL) 
            
                .post('auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            
            expect(resposta.status).to.equal(200); 
            expect(resposta.body.token).to.be.a('string');    


        })

        it('Deve retornar 401 sem o token em string quando usar senha invalida ', async () => { 
            const bodyLogin ={ ...postLogin }

            bodyLogin.password = "senhaErrada"

            const resposta = await request(process.env.BASE_URL) 
            
                .post('auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            
            expect(resposta.status).to.equal(401); 
            expect(resposta.body.token).to.be.undefined;


        })

        it('Deve retornar 401 sem o token em string quando usar usuario invalido ', async () => { 
            const bodyLogin ={ ...postLogin }

            bodyLogin.username = "usuarioInvalido"

            const resposta = await request(process.env.BASE_URL) 
            
                .post('auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin)

            
            expect(resposta.status).to.equal(401); 
            expect(resposta.body.token).to.be.undefined;


        })


    })


}) 