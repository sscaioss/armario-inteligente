import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'avnadmin',
  host: 'pg-15276cb8-caiosperandio2005-316a.e.aivencloud.com',
  database: 'defaultdb',
  password: 'AVNS_dHOKQZtD5Ce7jGrfsiK',
  port: 28221,
  ssl: {
    rejectUnauthorized: false  // Necessário para Aiven
  }
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