import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'SEU_USUARIO',           // ex: postgres
  host: 'localhost',
  database: 'armario_inteligente',
  password: 'SUA_SENHA',
  port: 5432
});

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function closeConnection() {
  await pool.end();
}