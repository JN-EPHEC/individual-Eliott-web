import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req : Request, res : Response) => {
  res.send('Bienvenue sur mon serveur API');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

function greet(name: string): string {
    return `Hello ${name}, welcome to TypeScript!`;
}

console.log(greet("Yoda"));
