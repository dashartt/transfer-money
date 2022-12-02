# Projeto: Transfer Money

## Objetivo

Criar aplicação fullstack que permite transferência de dinheiro entre usuários cadastrados no sistema

## Tecnologias usadas

- Typescript
- React, Recoil, Router Dom, Chakra UI
- Express, Prisma,

## Como usar a aplicação

Primeiro passo é clonar o repositório

```
git clone git@github.com:jonatasqueirozlima/transfer-money.git
```

Abra no VSCode

```
code transfer-money
```

E execute o comando

```
docker-compose up --build
```

A aplicação está up e pode ser testada

Rotas:

- backend: http://localhost:3001
- frontend: http://localhost:3000

## Observações do projeto

- A aplicação roda local e com banco de dados no Docker
  No momento, há um erro no docker onde o backend não aceita as requisições do frontend devido erro de CORS
- Futuros testes, tanto de backend quanto de frontend serão implementados
- E a documentação da API
