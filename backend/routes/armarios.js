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
    const { query } = await import('../db.js');
    const armarioId = req.params.id;
    
    console.log(`🗑️ Iniciando exclusão do armário ${armarioId}...`);
    
    // Passo 1: Quebrar TODAS as FKs primeiro
    // 1.1 - Remover FKs de pagamento nas sessões
    await query(`
      UPDATE sessao_de_uso 
      SET fk_pagamento_principal = NULL, 
          fk_pagamento_multa = NULL 
      WHERE fk_armario_id_armario = $1
    `, [armarioId]);
    console.log('✓ FKs de pagamento removidas das sessões');
    
    // 1.2 - Remover FK de sessao nos pagamentos
    await query(`
      UPDATE pagamento 
      SET fk_sessao_de_uso_id_sessao = NULL 
      WHERE fk_sessao_de_uso_id_sessao IN (
        SELECT id_sessao FROM sessao_de_uso WHERE fk_armario_id_armario = $1
      )
    `, [armarioId]);
    console.log('✓ FKs de sessão removidas dos pagamentos');
    
    // Passo 2: Deletar todos os registros relacionados (agora sem FKs)
    // 2.1 - Deletar bloqueios
    await query('DELETE FROM bloqueio WHERE fk_id_armario = $1', [armarioId]);
    console.log('✓ Bloqueios deletados');
    
    // 2.2 - Deletar manutenções
    await query('DELETE FROM manutencao WHERE fk_id_armario = $1', [armarioId]);
    console.log('✓ Manutenções deletadas');
    
    // 2.3 - Deletar pagamentos relacionados
    await query(`
      DELETE FROM pagamento 
      WHERE id_pagamento IN (
        SELECT DISTINCT fk_pagamento_principal FROM sessao_de_uso WHERE fk_armario_id_armario = $1 AND fk_pagamento_principal IS NOT NULL
        UNION
        SELECT DISTINCT fk_pagamento_multa FROM sessao_de_uso WHERE fk_armario_id_armario = $1 AND fk_pagamento_multa IS NOT NULL
      )
      OR fk_sessao_de_uso_id_sessao IN (
        SELECT id_sessao FROM sessao_de_uso WHERE fk_armario_id_armario = $1
      )
    `, [armarioId]);
    console.log('✓ Pagamentos deletados');
    
    // 2.4 - Deletar sessões de uso
    await query('DELETE FROM sessao_de_uso WHERE fk_armario_id_armario = $1', [armarioId]);
    console.log('✓ Sessões de uso deletadas');
    
    // Passo 3: Finalmente deletar o armário
    const result = await query(
      'DELETE FROM armario WHERE id_armario = $1',
      [armarioId]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Armário não encontrado' });
    }
    
    console.log(`✅ Armário ${armarioId} excluído com sucesso!`);
    res.json({ message: 'Armário excluído com sucesso' });
  } catch (err) {
    console.error('❌ Erro ao excluir armário:', err.message);
    console.error('Detalhes:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;