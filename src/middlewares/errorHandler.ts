import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error("Erreur capturée par le middleware d'erreur :", err);
    res.status(500).json({ error: "Une erreur inattendue est survenue", details: err instanceof Error ? err.message : "Erreur inconnue" });
};