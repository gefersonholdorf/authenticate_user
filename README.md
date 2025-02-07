## Authenticate User
Um projeto simples e eficiente para autenticação de usuários, desenvolvido com foco em segurança e facilidade de integração em sistemas modernos.

## 🚀 Funcionalidades
  - ✅ Cadastro de usuários
  - 🔑 Autenticação via login e senha
  - 🔒 Criptografia de senhas
  - 🔄 Geração e validação de tokens JWT
  - 📊 Controle de sessões
  - 📧 Envio de E-mail

## ⚙️ Tecnologias Utilizadas
  - Node.js
  - Express
  - JWT (JSON Web Token)
  - bcrypt para criptografia de senhas
  - Prisma com banco de dados relacional
  - Zod para validação de dados
  - Nodemailer para envio de e-mail

## Requisitos
  - Arquivo .env
```bash
Configure o arquivo .env:

DATABASE_URL="mysql://root:senha@localhost:3306/user_jwt"

PORT=3398

SECRET_KEY=d497f5f8-a5c4-40f3-96fd-25f443f9adf7

//Configure através do site: ethereal.email
MAIL_HOST=host
MAIL_PORT=port
MAIL_USER=user
MAIL_PASS=senha
```

📦 Instalação
```bash
Clone o repositório:

git clone https://github.com/gefersonholdorf/authenticate_user.git

Acesse o diretório do projeto:

cd authenticate_user

Instale as dependências:

npm install

Inicie o servidor:

npm run dev

```

## 📲 Rotas da API

1. Cadastro de Usuário

POST /create-user

Body:

{
  "user": "usuario",
  "email": "email@exemplo.com",
  "password": "senha_segura"
}

2. Login

POST /login

Body:

{
  "email": "email@exemplo.com",
  "password": "senha_segura"
}

Resposta: Token JWT para autenticação

3. Validação de Token

GET /test-authenticate

Header:

Authorization: Bearer <seu_token_jwt>

