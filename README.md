# UniQuiz 🎓

Sistema web de quizzes acadêmicos desenvolvido para o projeto do 6º semestre da faculdade.

O objetivo do projeto é permitir que usuários criem, editem e respondam quizzes organizados por temas, com sistema de pontuação, ranking e autenticação de usuários.

---

# 📚 Funcionalidades

## 👤 Usuários

- Cadastro de usuários
- Login autenticado com JWT
- Sessão do usuário
- Perfil do usuário

---

## 🧠 Quizzes

- Criação de quizzes
- Edição de quizzes
- Exclusão de quizzes
- Organização por temas
- Definição de dificuldade

---

## ❓ Perguntas e Alternativas

- CRUD completo de perguntas
- CRUD completo de alternativas
- Definição de alternativa correta
- Edição dinâmica de perguntas
- Exclusão automática em cascata

---

## 🎮 Sistema de Respostas

- Responder quizzes em tempo real
- Timer por pergunta
- Controle de pontuação
- Resultado final
- Registro de tentativas

---

## 🏆 Ranking

- Ranking por quiz
- Ordenação por:
  - Maior pontuação
  - Menor tempo
- Histórico de tentativas

---

# 🛠 Tecnologias Utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript Vanilla

## Backend

- Node.js
- Express.js

## Banco de Dados

- MySQL
- Prisma ORM

## Autenticação

- JWT (JSON Web Token)

---

# 🧱 Arquitetura do Projeto

O backend segue uma arquitetura baseada em:

- Controllers
- Routes
- Middlewares
- Services
- Prisma ORM

---

# 📂 Estrutura do Projeto

```bash
UniQuiz/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── database/
│   │
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── assets/
│   └── *.html
│
└── README.md
```

---

# ⚙️ Como Executar o Projeto

## 1. Clonar o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Entrar na pasta backend

```bash
cd backend
```

---

## 3. Instalar as dependências

```bash
npm install
```

---

## 4. Configurar o arquivo `.env`

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/uniquiz"
JWT_SECRET="sua_chave_secreta"
```

---

## 5. Configurar banco de dados

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

---

## 6. Gerar Prisma Client

```bash
npx prisma generate
```

---

## 7. Iniciar o backend

```bash
npm run dev
```

Servidor backend:

```bash
http://localhost:3000
```

---

## 8. Executar o frontend

Utilize a extensão Live Server do VSCode para abrir os arquivos HTML.

---

# 🗄 Banco de Dados

O sistema possui relacionamento entre:

- usuários
- quizzes
- perguntas
- alternativas
- tentativas
- temas

---

# 🔐 Autenticação

A autenticação é feita utilizando JWT.

As rotas protegidas utilizam middleware de autenticação para validar o token do usuário.

---

# 📈 Funcionalidades Futuras

- Dashboard de estatísticas
- Ranking global
- Sistema de conquistas
- Upload de imagem nas perguntas
- Multiplayer em tempo real
- Comentários em quizzes
- Favoritar quizzes

---

# 📸 Screenshots

## Página de Quizzes

Adicione aqui uma screenshot futuramente.

## Editor de Quiz

Adicione aqui uma screenshot futuramente.

## Sistema de Respostas

Adicione aqui uma screenshot futuramente.

---

# 👨‍💻 Desenvolvido por

Projeto acadêmico desenvolvido para o 6º semestre da faculdade.
