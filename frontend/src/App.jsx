import { useState } from 'react';
import ArmarioList from "./components/ArmarioList";
import ArmarioForm from "./components/ArmarioForm";
import ArmarioEdit from "./components/ArmarioEdit";
import './App.css';

function App() {
  const [view, setView] = useState('list');
  const [selectedArmario, setSelectedArmario] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (armario) => {
    setSelectedArmario(armario);
    setView('edit');
  };

  const handleSuccess = () => {
    setView('list');
    setSelectedArmario(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app">
      <header>
        <h1>🔐 Sistema de Armários Inteligentes</h1>
        <nav>
          <button onClick={() => setView('list')} className={view === 'list' ? 'active' : ''}>
            Listar Armários
          </button>
          <button onClick={() => setView('create')} className={view === 'create' ? 'active' : ''}>
            Cadastrar Armário
          </button>
        </nav>
      </header>

      <main>
        {view === 'list' && (
          <ArmarioList 
            key={refreshKey}
            onEdit={handleEdit} 
            onRefresh={() => setRefreshKey(prev => prev + 1)}
          />
        )}
        {view === 'create' && <ArmarioForm onSuccess={handleSuccess} />}
        {view === 'edit' && selectedArmario && (
          <ArmarioEdit armario={selectedArmario} onSuccess={handleSuccess} />
        )}
      </main>
    </div>
  );
}

export default App;