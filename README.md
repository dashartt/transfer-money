# 🚀 Bem vindo ao projeto Transfer Money!

## Introdução

Aplicação full-stack com docker com a proposta de um sistema semelhante a um sistema bancário, onde é possível depositar na conta para obter saldo e transferir dinheiro para outros usuários cadastrados no sistema

<!-- ![alt text](https://raw.githubusercontent.com/abnerferreiradesousa/app-transferDIN/main/images/app.png) -->

<details>
<summary><strong> Tecnologias utilizadas </strong></summary>

Frontend:

<ul> 
<li> React c/ Typescript</li>
<li> Chakra UI</li>
<li> Recoil</li>
<li> React-router-dom</li>
<li> Jest</li>
</ul>
<hr>

Backend:

<ul> 
<li> Express c/ Typescript</li>
<li> Prisma c/ mysql2</li>
<li> Jest</li>
<li> jsonwebtoken</li>
<li> zod</li>
<li> momentjs</li>
</ul>

</details>

<details>
<summary><strong> Critérios do projeto </strong></summary>

### Backend

    - **Stack Base**
        - Um servidor em Node.js utilizando Typescript;
        - Um ORM de sua preferência;
        - Um bancos de dados PostgreSQL.
    - **Arquitetura** (Veja o diagrama abaixo p/ entender melhor)
        - Tabela **Users:**
            - id —> *PK*
            - username (o @ do usuário)
            - password (*hasheada*)
            - accountId —> *FK* Accounts[id]
        - Tabela **Accounts:**
            - id —> *PK*
            - balance
        - Tabela **Transactions:**
            - id —> *PK*
            - debitedAccountId —> *FK* Accounts[id]
            - creditedAccountId —> *FK* Accounts[id]
            - value
            - createdAt
    - **As seguintes regras de negócio devem ser levadas em consideração durante o processo de estruturação dos *endpoints*:**
        - Qualquer pessoa deverá poder fazer parte do app. Para isso, basta realizar o cadastro informando *username* e *password*.
        - Deve-se garantir que cada *username* seja único e composto por, pelo menos, 3 caracteres.
        - Deve-se garantir que a *password* seja composta por pelo menos 8 caracteres, um número e uma letra maiúscula. Lembre-se que ela deverá ser *hashada* ao ser armazenada no banco.
        - Durante o processo de cadastro de um novo usuário, sua respectiva conta deverá ser criada automaticamente na tabela **Accounts** com um *balance* de R$ 100,00. É importante ressaltar que caso ocorra algum problema e o usuário não seja criado,  a tabela **Accounts** não deverá ser afetada.
        - Todo usuário deverá conseguir logar na aplicação informando *username* e *password.* Caso o login seja bem-sucedido, um token JWT (com 24h de validade) deverá ser fornecido.
        - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar seu próprio *balance* atual. Um usuário A não pode visualizar o *balance* de um usuário B, por exemplo.
        - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de realizar um *cash-out* informando o *username* do usuário que sofrerá o *cash-in*), caso apresente *balance* suficiente para isso. Atente-se ao fato de que um usuário não deverá ter a possibilidade de realizar uma transferência para si mesmo.
        - Toda nova transação bem-sucedida deverá ser registrada na tabela **Transactions**. Em casos de falhas transacionais, a tabela **Transactions** não deverá ser afetada.
        - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de visualizar as transações financeiras (*cash-out* e *cash-in*) que participou. Caso o usuário não tenha participado de uma determinada transação, ele nunca poderá ter acesso à ela.
        - Todo usuário logado (ou seja, que apresente um token válido) deverá ser capaz de filtrar as transações financeiras que participou por:
            - Data de realização da transação e/ou
                - Transações de *cash-out;*
                - Transações de *cash-in.*

### Frontend

    - **Stack Base**
        - React ou Next utilizando Typescript;
        - CSS3 ou uma biblioteca de estilização de sua preferência;
    - **As seguintes regras de negócio devem ser levadas em consideração durante a estruturação da interface visual:**
        - Página para realizar o cadastro informando *username* e *password.*
        - Página para realizar o login informando *username* e *password.*
        - Com o usuário logado, a página principal deve apresentar:
            - *balance* atual do usuário;
            - Seção voltada à realização de transferências para outros usuários a partir do *username* de quem sofrerá o *cash-in*;
            - Tabela com os detalhes de todas as transações que o usuário participou;
            - Mecanismo para filtrar a tabela por data de transação e/ou transações do tipo *cash-in*/*cash-out*;
            - Botão para realizar o *log-out.*

</details>

---

## 👨‍💻 Rodando o projeto👨

<details>
  
<summary><strong>Como rodar?</strong></summary>
  
1. Clone o repositório com o comando: <br/>
  `git clone git@github.com:jonatasqueirozlima/transfer-money.git`;
2. Entre na pasta do repositório: <br/>
  `cd transfer-money`
2. Inicie a aplicação com o comando:
 - `docker-compose up -d --build`
 - *Obs: Criará tres containeres, frontend na porta 3000, backend na porta 3001 e database na porta 3306. Certifique que essas portas estejam livres*
3. Acessar a seguinte URL: <br/>
  http://localhost:3000/
  - Caso queira testar a API, basta acessar o tópico <i>"Como usar cada rota?".</i>

</details>

<details>
  
<summary><strong>Como usar cada rota?</strong></summary>  
</br>
 
[Rotas documentadas](https://github.com/jonatasqueirozlima/transfer-money/blob/main/API_README.md)
      
</details>

---

## 💥 Defafios que enfrentei

- 🗡️ Manter a API com responsabilidade única em alguns momentos, resolvendo de usar mais middlewares invés de lidar com várias operações na camada Service.
- 🛡️ Dockerizar a aplicação.
- 🥊 Utilizar Prisma pela primeira vez.
- ⚔️ Manipular os erros quando algo ocorre de errado na comunicação entre Backend e Frontend.
- 💥 Segregação de tipagem e a nomeação para cada uma.

---

## ✍️ Considerações finais

<p>
Desenvolver mais rápido com antes um bom planejamento. Sair codando a aplicação no meio do caminho é necessário rever e até refazer algumas lógicas no código que gasta um tempo que poderia ter poupado. 
</p>

<p>Fazer os testes primeiro, com um bom planejamento já dá uma ideia inicial de como deve ser o código e nisso fazer os testes que falham para quando codar, o teste passar. Deixar o teste para o final dá impressão que leva muito mais tempo fazendo testes do que fazer no começo</p>

---

## 🥷 Próximos passos</h2>

- Refatorar tipagem
- Refatorar componentes do frontend para ficarem menores
- Deploy de toda a aplicação.</p>
- Testes de integração
