## Passos na API

- Rode yarn para a instalação das dependencias.
- Subir as databases usadas

- Cria um DB com o nome "meetapp" pode utilizar gerenciador como o postico ou o postbird.
- Criar o arquivo .env (existe um example já preenchido para facilitar).

- Faça a migration: yarn sequelize db:migrate
- Rode o server e a fila para envio de emails yarn dev e yarn queue

### Database usado

- docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
- docker run --name redismeetup -p 6379:6379 -d -t redis:alpine

### Seeds

- yarn sequelize db:migrate
- yarn sequelize db:seed:all

Login user 1: admin@admin.com:123456
Login user 2: user@user.com:123456

---

“Faça seu melhor, mas sempre com prazo de entrega”!
