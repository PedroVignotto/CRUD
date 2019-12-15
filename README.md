## 🎓 Instalação e execução

1. Faça um clone desse repositório;
2. Entre na pasta rodando `cd CRUD`;

### Backend

3. Entre na pasta rodando `cd backend`;
4. Rode `npm i` para instalar as dependências;
5. Crie um banco de dados `Mysql`;
7. Renomeie o arquivo `.env.example` para `.env`;
8. Coloque as suas credenciais dentro do `.env`;
9. Rode `npx sequelize-cli db:migrate` para executar as migrations;
8. Rode `npx sequelize-cli db:seed:all` para executar as seeds;
10. Rode `npm run dev` para iniciar o servidor.

### Web

3. Entre na pasta rodando `cd frontend`;
4. Rode `npm i` para instalar as dependências;
6. Rode `npm run start` para iniciar o servidor.

---

Feito com ♥ by Pedro Vignotto :wave: [Contato](https://www.linkedin.com/in/pedro-vignotto/)
