# 🔐 Armário Inteligente - Sistema de Gestão

> Sistema web para gerenciamento de armários inteligentes com CRUD completo, desenvolvido como projeto final da disciplina de Banco de Dados do IFES Serra.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Express](https://img.shields.io/badge/Express-4-lightgrey)](https://expressjs.com/)

---

## 📖 Sobre o Projeto

O **Armário Inteligente** é uma aplicação web que permite o gerenciamento completo de armários de locação em ambientes como estações, shoppings e academias. O sistema realiza o **CRUD** da entidade **Armário**, permitindo que atendentes cadastrem, consultem, editem e removam armários, mantendo o controle de status, tamanhos, senhas de acesso e histórico de limpeza.

O projeto foi desenvolvido para atender aos requisitos funcionais e não funcionais especificados no documento de definição de requisitos, incluindo:
- ✅ Ambiente web (RNF01)
- ✅ Banco de dados relacional (RNF02)
- ✅ Interface simples e intuitiva (RNF03)
- ✅ Desenvolvido em React (RNF05)

---

## ✨ Funcionalidades

O sistema implementa o **CRUD completo** da entidade Armário:

| Operação | Descrição |
|----------|-----------|
| **Create** | Cadastrar novo armário informando tamanho, status, senha e data da última limpeza |
| **Read** | Listar todos os armários em formato de tabela ou consultar um armário específico |
| **Update** | Editar informações de armários existentes (status, senha, tamanho, etc.) |
| **Delete** | Excluir armários do sistema com confirmação de segurança |

### Recursos extras:
- 🎨 Interface responsiva e moderna com gradientes
- 🏷️ Badges coloridos por status (Disponível, Ocupado, Manutenção, Limpeza Pendente)
- ⚡ Atualização em tempo real após operações
- 🔒 Confirmação antes de excluir registros

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web para API REST
- **pg (node-postgres)** - Driver PostgreSQL para Node.js
- **CORS** - Middleware para permitir requisições cross-origin

### Frontend
- **React 18** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **Axios** - Cliente HTTP para comunicação com a API
- **CSS3** - Estilização responsiva

### Banco de Dados
- **PostgreSQL 15** - SGBD relacional

### Ferramentas
- **Git** - Controle de versão
- **GitHub** - Hospedagem do repositório

---

## 📁 Estrutura do Projeto
armario-inteligente/
├── backend/
│ ├── routes/
│ │ └── armarios.js # Rotas CRUD da API
│ ├── db.js # Conexão com PostgreSQL
│ ├── server.js # Servidor Express
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── ArmarioList.jsx # Listagem
│ │ │ ├── ArmarioForm.jsx # Cadastro
│ │ │ └── ArmarioEdit.jsx # Edição
│ │ ├── services/
│ │ │ └── api.js # Configuração Axios
│ │ ├── App.jsx
│ │ └── App.css
│ └── package.json
└── README.md


---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado:
- [Node.js](https://nodejs.org/) (v18 ou superior)
- [PostgreSQL](https://www.postgresql.org/download/) (v12 ou superior)
- [Git](https://git-scm.com/)

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/SEU-USUARIO/armario-inteligente.git
cd armario-inteligente


2️⃣ Configurar o Banco de Dados
Acesse o PostgreSQL e crie o banco:
CREATE DATABASE armario_inteligente;
Execute os scripts SQL de criação e carga (disponíveis no documento do trabalho):
psql -U postgres -d armario_inteligente -f scripts/criacao.sql
psql -U postgres -d armario_inteligente -f scripts/carga.sql

3️⃣ Configurar e Iniciar o Backend
cd backend
npm install

Edite o arquivo db.js com suas credenciais do PostgreSQL:
const pool = new Pool({
  user: 'postgres',              // seu usuário
  host: 'localhost',
  database: 'armario_inteligente',
  password: 'sua_senha',         // sua senha
  port: 5432
});


Inicie o servidor:
npm start

O backend estará rodando em: http://localhost:3001
4️⃣ Iniciar o Frontend
Em um novo terminal:
cd frontend
npm install
npm run dev

O frontend estará disponível em: http://localhost:5173


👥 Equipe
Projeto desenvolvido pelos alunos do IFES Serra para a disciplina de Banco de Dados:
Álvaro Neto
Christian Borges
Caio Sperandio
Elson Ramos
Ramon Lima



