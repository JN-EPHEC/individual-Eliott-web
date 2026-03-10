import { useEffect, useState } from "react";
import './App.css';

interface User {
  id?: number;
  lastName: string;
  firstName: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch('/api');
      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Erreur UI:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id: number) => {
    if (!confirm("Supprimer ?")) return;
    await fetch(`/api/${id}`, { method: 'DELETE' });
    loadUsers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { firstName, lastName };

    const response = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      setFirstName("");
      setLastName("");
      loadUsers();
    } else {
      const err = await response.json();
      alert(err.error);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-4">Liste des étudiants</h1>

      <form onSubmit={handleSubmit} className="d-flex gap-3 mb-5">
        <input 
          type="text" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="form-control" 
          placeholder="Nom" 
          required 
        />
        <input 
          type="text" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form-control" 
          placeholder="Prénom" 
          required 
        />
        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>

      <hr />

      <div className="user-list">
        {data.map((user, index) => (
          <div key={user.id || index} className="user-item d-flex align-items-center mb-2 shadow-sm">
            <span className="flex-grow-1">{user.firstName} {user.lastName}</span>
            <button 
              className="btn btn-danger btn-sm" 
              onClick={() => user.id && deleteUser(user.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;