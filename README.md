# Armário Inteligente

Sistema de gestão de armários desenvolvido para a disciplina de Banco de Dados do IFES Serra.

## O que o sistema faz

Permite cadastrar, listar, editar e excluir armários através de uma interface web. O backend se comunica com um banco PostgreSQL (usamos Aiven em nuvem).

## Tecnologias

- **Backend:** Node.js + Express
- **Frontend:** React + Vite
- **Banco:** PostgreSQL
- **Conexão:** Axios (frontend) e pg (backend)

## Estrutura do projeto


```text
armario-inteligente/
├── backend/
│ ├── routes/armarios.js # CRUD completo
│ ├── db.js # Conexão com PostgreSQL
│ ├── server.js # Servidor Express
│ └── .env # Credenciais (não vai pro GitHub)
├── frontend/
│ ├── src/
│ │ ├── components/ # Telas do sistema
│ │ ├── services/api.js # Conexão com backend
│ │ └── App.jsx
│ └── index.html
└── README.md
```

## Como rodar

### 1. Clone o repositório
```bash
git clone https://github.com/sscaioss/armario-inteligente.git
cd armario-inteligente



### 2. Configure o banco
# Crie um banco PostgreSQL e execute os scripts SQL do relatório do trabalho.

### 3. Rode o backend
```bash
cd backend
npm install

# Crie o arquivo .env com suas credenciais:
```text
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=armario_inteligente
DB_PASSWORD=sua_senha
DB_PORT=5432
```

# Inicie o servidor:
```bash
npm start

### 4. Rode o frontend
Abra outro terminal:
```bash
cd frontend
npm install
npm run dev

## Acesse: http://localhost:5173

### Rotas da API
- GET /api/armarios - Lista todos
- POST /api/armarios - Cria novo
- PUT /api/armarios/:id - Atualiza
- DELETE /api/armarios/:id - Exclui

## Integrantes da Equipe
- Álvaro Neto
- Christian Borges
- Caio Sperandio
- Elson Ramos
- Ramon Lima
