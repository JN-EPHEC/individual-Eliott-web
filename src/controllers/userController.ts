import type { Request, Response } from "express";
import { userService } from "../services/userService.js";

export const getAllUsers = async (req : Request, res : Response) => {
    console.log("Requête GET reçue sur /api"); // Pour voir si ça arrive jusqu'ici
    try {
        if (!userService) {
            console.error("ERREUR : userService est undefined !");
            return res.status(500).json({ error: "Service non chargé" });
        }
        const users = await userService.getAllUsers();
        console.log("Utilisateurs récupérés :", users.length);
        res.status(200).json(users);
    } catch (error) {
        console.error("--- ERREUR CRITIQUE ---");
        console.error(error); // C'est CA qui va s'afficher dans ton terminal VS Code
        res.status(500).json({ error: "Crash serveur", details: error.message });
    }
};

export const createUser = async (req : Request, res : Response) => {
    const { firstName, lastName } = req.body;

    if (!firstName || firstName.trim().length < 2 || !lastName || lastName.trim().length < 2) {
        return res.status(400).json({ error: "Nom et prénom obligatoires (min 2 car.)" });
    }

    try {
        const newUser = await userService.createUser({ firstName, lastName });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Erreur POST:", error);
        res.status(500).json({ error: "Erreur de création" });
    }
};

export const deleteUser = async (req : Request, res : Response) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }
        res.status(200).json({ message: "Supprimé" });
    } catch (error) {
        console.error("Erreur DELETE:", error);
        res.status(500).json({ error: "Erreur de suppression" });
    }
};