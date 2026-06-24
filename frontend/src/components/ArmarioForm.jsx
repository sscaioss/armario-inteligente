import { useState } from 'react';
import api from '../services/api';

function ArmarioForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    tamanho: 'Pequeno',
    status: 'Disponível',
    senha_atual: '',
    data_ultima_limpeza: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/armarios', formData);
      alert('Armário cadastrado com sucesso!');
      onSuccess();
    } catch (error) {
      alert('Erro ao cadastrar: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="armario-form">
      <h2>Cadastrar Novo Armário</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tamanho:</label>
          <select name="tamanho" value={formData.tamanho} onChange={handleChange} required>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Disponível">Disponível</option>
            <option value="Ocupado">Ocupado</option>
            <option value="Manutenção">Manutenção</option>
            <option value="Limpeza Pendente">Limpeza Pendente</option>
          </select>
        </div>
        <div className="form-group">
          <label>Senha Atual:</label>
          <input type="text" name="senha_atual" value={formData.senha_atual} onChange={handleChange} placeholder="Ex: 1234" />
        </div>
        <div className="form-group">
          <label>Data da Última Limpeza:</label>
          <input type="date" name="data_ultima_limpeza" value={formData.data_ultima_limpeza} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default ArmarioForm;