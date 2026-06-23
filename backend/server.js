import express from 'express';
import cors from 'cors';
import armariosRouter from './routes/armarios.js';
import { closeConnection } from './db.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/armarios', armariosRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});