import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';
import { base, faker } from '@faker-js/faker';
import { StatusCodes } from 'http-status-codes';

describe('API Mercado', () => {
    const user = 'admin'
    const password = 'password'
    const p = pactum;
    const rep = SimpleReporter;
    const baseUrl = 'https://api-desafio-qa.onrender.com/Mercado';
    let idMercado = 1;


    p.request.setDefaultTimeout(90000);

    const nomeMercado = faker.name.firstName();

    describe('Mercado -> ', () => {
        it('Criar novo mercado', async () => {
            idMercado = await p
                .spec()
                .post(`${baseUrl}`)
                .withJson({
                    "nome": nomeMercado,
                    "cnpj": "61525669000191",
                    "endereco": "R da satc"
                })
                .expectStatus(StatusCodes.CREATED);
        }, 990000); 

        it('Criando mercado sem CNPJ', async () => {
            await p
                .spec()
                .post(`${baseUrl}`)
                .withJson({
                    "nome": "Mercado do Rafael",
                    "endereco": "R da satc"
                })
                .expectStatus(StatusCodes.BAD_REQUEST);
        }, 990000); 

        it('Retorna mercados cadastrados', async () => {
            await p
                .spec()
                .get(`${baseUrl}`)
                .expectStatus(StatusCodes.OK);
        }, 990000); 

        it('Altera informações do mercado', async () => {
            await p
                .spec()
                .put(`${baseUrl}/1`)
                .withBody({
                    "nome": `Mercado ${faker.number.bigInt()}`,
                    "cnpj": "745632145896512",
                    "endereco": 'Longe de mais'
                })
                .expectStatus(StatusCodes.OK)
        }, 990000); 

        it('Deleta mercado', async ()=>{
            await p
                .spec()
                .delete(`${baseUrl}/1`)
                .expectStatus(StatusCodes.OK)
        }, 990000); 

        it('Deleta mercado que não existe', async ()=>{
            await p
                .spec()
                .delete(`${baseUrl}/99999999999999999`)
                .expectStatus(StatusCodes.NOT_FOUND)
        }, 990000); 

        it('Busca produtos do mercado pelo ID', async()=>{
            await p 
                .spec()
                .get(`${baseUrl}/5/produtos`)
                .expectStatus(StatusCodes.OK)
        }, 990000); 

        it('Busca produtos do mercado pelo ID que não existe', async()=>{
            await p
                .spec()
                .get(`${baseUrl}/99999999999999/produtos`)
                .expectStatus(StatusCodes.NOT_FOUND)
        }, 990000); 
    });
});