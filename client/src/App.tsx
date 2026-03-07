import { useEffect, useState } from "react";
import './App.css';

interface User {
  lastName: string;
  firstName: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Liste des étudiants</h1>

      {/* Formulaire - On garde la structure Bootstrap */}
      <form className="row g-3 mb-5">
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Nom" required />
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Prénom" required />
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary w-100">Ajouter</button>
        </div>
      </form>

      <hr />

      {/* Liste des étudiants */}
      <ul className="list-group">
        {data.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {item.lastName} {item.firstName}
            <button className="btn btn-danger btn-sm">Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;