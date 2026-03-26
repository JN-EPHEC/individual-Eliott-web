/*
Âge (number) :
    — Doit être un nombre valide.
    — Si inférieur à 18 ans : Inscription refusée (retourne false), sauf si le rôle est ”stagiaire” (retourne true).
    — Si supérieur à 120 ans : Doit lever une erreur (throw new Error("Âge invalide")).

Rôle (string) :
    — N’accepte que trois valeurs exactes : ”admin”, ”user”, ou ”stagiaire”.
    — Toute autre valeur lève une erreur (throw new Error("Rôle invalide")).

Email (string) :
    — Doit obligatoirement contenir un caractère @ et un point ..
    — Sinon, retourne false.
*/

export function validateUserRegistration(age : number, role : string, email : string) : boolean {

    //Âge
    if (typeof age !== 'number' || isNaN(age)) {
        throw new Error("pas un Number");
    }

    const valideRole = ['stagiaire', 'admin', 'user']

    //Rôle
    if (!valideRole.includes(role)) {
        throw new Error("Rôle invalide")
    }

    if (age > 120) {
        throw new Error("Âge invalide")
    }

    if (age < 18) {
        if (role === 'stagiaire') {
            return true
        }
        return false
    }

    //Email
    if (!email.includes('@') || !email.includes('.')) {
        return false
    }

    return true
}