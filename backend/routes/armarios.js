import express from 'express';
import { query } from '../db.js';

const router = express.Router();

// CREATE - Cadastrar novo armário
router.post('/', async (req, res) => {
  try {
    const { tamanho, status, senha_atual, data_ultima_limpeza } = req.body;
    
    const result = await query(
      `INSERT INTO Armario (tamanho, status, senha_atual, data_ultima_limpeza) 
       VALUES ($1, $2, $3, $4::DATE)
       RETURNING id_armario`,
      [tamanho, status, senha_atual, data_ultima_limpeza]
    );
    
    res.status(201).json({ 
      message: 'Armário cadastrado com sucesso',
      id: result.rows[0].id_armario
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Listar todos os armários
router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM Armario ORDER BY id_armario');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ - Buscar um armário específico
router.get('/:id', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM Armario WHERE id_armario = $1',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Armário não encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE - Atualizar armário
router.put('/:id', async (req, res) => {
  try {
    const { tamanho, status, senha_atual, data_ultima_limpeza } = req.body;
    
    const result = await query(
      `UPDATE Armario 
       SET tamanho = $1, 
           status = $2, 
           senha_atual = $3,
           data_ultima_limpeza = $4::DATE
       WHERE id_armario = $5`,
      [tamanho, status, senha_atual, data_ultima_limpeza, req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Armário não encontrado' });
    }
    
    res.json({ message: 'Armário atualizado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Excluir armário
router.delete('/:id', async (req, res) => {
  try {
    const result = await query(
      'DELETE FROM Armario WHERE id_armario = $1',
      [req.params.id]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Armário não encontrado' });
    }
    
    res.json({ message: 'Armário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;