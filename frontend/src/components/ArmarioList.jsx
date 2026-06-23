import { useState, useEffect } from 'react';
import api from '../services/api';

function ArmarioList({ onEdit, onRefresh }) {
  const [armarios, setArmarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArmarios();
  }, []);

  const loadArmarios = async () => {
    try {
      const response = await api.get('/armarios');
      setArmarios(response.data);
    } catch (error) {
      alert('Erro ao carregar armários: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este armário?')) return;
    
    try {
      await api.delete(`/armarios/${id}`);
      alert('Armário excluído com sucesso!');
      onRefresh();
    } catch (error) {
      alert('Erro ao excluir: ' + error.message);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="armario-list">
      <h2>Armários Cadastrados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tamanho</th>
            <th>Status</th>
            <th>Senha Atual</th>
            <th>Última Limpeza</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {armarios.map(armario => (
            <tr key={armario.id_armario}>
              <td>{armario.id_armario}</td>
              <td>{armario.tamanho}</td>
              <td>
                <span className={`status-badge ${armario.status.toLowerCase()}`}>
                  {armario.status}
                </span>
              </td>
              <td>{armario.senha_atual || '-'}</td>
              <td>{armario.data_ultima_limpeza?.split('T')[0] || '-'}</td>
              <td>
                <button onClick={() => onEdit(armario)} className="btn-edit">
                  Editar
                </button>
                <button onClick={() => handleDelete(armario.id_armario)} className="btn-delete">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ArmarioList;