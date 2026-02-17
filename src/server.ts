import express from 'express';
import userRoutes from "./routes/userRoutes";
import sequelize from "./config/database.js";
import User from "./models/User";

const app = express();
const port = 3000; 
const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean"},
    { id: 2, nom: "Martin", prenom: "Sophie"},
    { id: 3, nom: "Doe", prenom: "Jhon"}
];
let print = console.log

app.get('/', (req : Request, res : Response ) => {
    res.send("Bienvenue sur mon serveur API");
});

app.get('/api/data', (req : Request, res : Response) => {
    res.json(etudiants);
});

app.get('/api/hello/:name', (req : Request, res : Response) => {
    let retours = {message : `bonjours ${req.params.name}`, timestamp : new Date}
    res.json(retours);
});

app.use("/api", userRoutes);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("tt fonctionne")
    }
    catch (error) {
        console.error("il y a un probleme avec la connection db" + error);
    }
    try {
        await sequelize.sync()
        console.log("synchro ok")
        app.listen(port,() => {
        console.log(`serveur lancé sur http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("é bé la synchro bah elle a pas fonctionner, " + error)
    }
}

testConnection()