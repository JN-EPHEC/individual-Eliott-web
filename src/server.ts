import express from 'express';
import userRoutes from './routes/userRoutes';


const app = express();
const port = 3000;
const etudiants = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/hello/:name', (req : Request, res : Response) => {
  let retours = {message : `Bonjour ${req.params.name}`, timeStamp : new Date};
  res.json(retours);
});

app.get('/', (req : Request, res : Response) => {
  res.send('Bienvenue sur mon serveur API');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

app.get('/api/data', (req : Request, res : Response) => {
  res.json(etudiants);
});

app.use('/api', userRoutes);

function greet(name: string): string {
    return `Hello ${name}, welcome to TypeScript!`;
}

console.log(greet("Yoda"));
