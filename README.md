# Armário Inteligente - Sistema de Gestão

Projeto prático desenvolvido para a disciplina de Banco de Dados do IFES Serra. O sistema consiste em uma aplicação web com foco no gerenciamento de armários por meio de um CRUD completo.

## Sobre o Projeto

O sistema foi criado para gerenciar armários de locação em ambientes públicos e comerciais. A aplicação realiza todas as operações básicas (inserção, consulta, alteração e exclusão) para a entidade Armário, permitindo o controle de status, tamanho, senha atual e registro de higienização.

A implementação atende aos seguintes requisitos do projeto:
- Ambiente web (RNF01)
- Banco de dados relacional (RNF02)
- Interface de fácil utilização (RNF03)
- Desenvolvimento em React (RNF05)

## Tecnologias Utilizadas

- **Backend:** Node.js, Express.js e driver `pg` (node-postgres)
- **Frontend:** React 18, Vite e Axios
- **Banco de Dados:** PostgreSQL 15

## Estrutura de Diretórios

```text
armario-inteligente/
├── backend/
│   ├── routes/
│   │   └── armarios.js      # Rotas CRUD da API
│   ├── db.js                # Configuração da conexão com PostgreSQL
│   ├── server.js            # Ponto de entrada do servidor Express
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ArmarioList.jsx  # Tela de listagem de armários
│   │   │   ├── ArmarioForm.jsx  # Formulário de cadastro
│   │   │   └── ArmarioEdit.jsx  # Tela de edição
│   │   ├── services/
│   │   │   └── api.js           # Conexão HTTP do frontend com o backend
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── README.md
```

## Como Executar o Projeto

### Pré-requisitos
- Node.js instalado (versão 18 ou superior)
- PostgreSQL instalado e em execução
- Git para clonagem do repositório

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/armario-inteligente.git](https://github.com/seu-usuario/armario-inteligente.git)
cd armario-inteligente
```

### 2. Configurar o Banco de Dados
Acesse o terminal do PostgreSQL e crie a base de dados do projeto:
```sql
CREATE DATABASE armario_inteligente;
```

Em seguida, execute os scripts de estrutura e os dados iniciais fornecidos no relatório do trabalho:
```bash
psql -U postgres -d armario_inteligente -f scripts/criacao.sql
psql -U postgres -d armario_inteligente -f scripts/carga.sql
```

### 3. Executar o Backend
Navegue até a pasta do servidor, instale as dependências e inicie a aplicação:
```bash
cd backend
npm install
```

Antes de iniciar, edite o arquivo `backend/db.js` informando as credenciais locais do seu PostgreSQL:
```javascript
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'armario_inteligente',
  password: 'sua_senha_aqui',
  port: 5432
});
```

Inicie o servidor:
```bash
npm start
```
O backend ficará disponível em `http://localhost:3001`.

### 4. Executar o Frontend
Abra um novo terminal na raiz do projeto, acesse a pasta do cliente e execute o ambiente de desenvolvimento:
```bash
cd frontend
npm install
npm run dev
```
O frontend ficará disponível em `http://localhost:5173`.

## Integrantes da Equipe
- Álvaro Neto
- Christian Borges
- Caio Sperandio
- Elson Ramos
- Ramon Lima
