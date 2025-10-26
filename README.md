# API de Alimentação de Animais

Esta API permite o registro, consulta e acompanhamento da alimentação de animais, com autenticação JWT.

## Funcionalidades
- Registro de animal (nome, idade, espécie, tutor)
- Registro de alimentação (animal, horário, alimento, quantidade)
- Consulta de um animal
- Listagem de todos os animais
- Alteração dos dados do animal
- Exclusão do animal
- Consulta de alimentações por animal ou geral
- Autenticação via login (JWT)
- Documentação Swagger disponível em `/api-docs`

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie a API:
   ```bash
   npm start
   ```
3. Acesse a documentação Swagger em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Autenticação
- Faça login em `/auth/login` com:
  ```json
  {
    "username": "admin",
    "password": "admin"
  }
  ```
- Use o token JWT retornado no header `Authorization` das requisições protegidas:
  ```
  Authorization: Bearer <token>
  ```

## Estrutura do Projeto
- `src/routes` — Rotas da API
- `src/controllers` — Lógica dos endpoints
- `src/services` — Regras de negócio (pode ser expandido)
- `src/models` — Modelos e armazenamento em memória
- `src/middleware` — Middlewares (autenticação)
- `resources/swagger.json` — Documentação Swagger

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar.
- O Swagger detalha todos os endpoints, modelos e possíveis erros.
