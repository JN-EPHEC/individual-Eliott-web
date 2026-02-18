import express from 'express';
import userRoutes from "./routes/userRoutes.js"; // Vérifie bien le .js ici !
import sequelize from "./config/database.js";
import User from "./models/User.js";

const app = express();
const port = 3000; 

app.use(express.json());
app.use("/api", userRoutes);
app.use('/', express.static('public'));

async function seedDatabase() {
    const count = await User.count();
    if (count === 0) {
        await User.bulkCreate([
            { firstName: "Ada", lastName: "Lovelace" },
            { firstName: "Alan", lastName: "Turing" }
        ]);
        console.log("🌱 Seeds insérées.");
    }
}

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await seedDatabase();
        app.listen(port, () => {
            console.log(`🚀 http://localhost:${port}`);
        });
    } catch (e) {
        console.error("Crash:", e);
    }
}

start();