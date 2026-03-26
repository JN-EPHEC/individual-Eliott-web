import { validateUserRegistration } from "../utils/userValidator"; // Adapte le chemin si besoin

const userValidatorTest = [
    // [age, role, email, attendu, description]

    // age > 18
    [17, "stagiaire", "eliott@truc.be", true, "test valide"],
    [17, "user", "http://@eliott", false, "test non valide car il n'y a pas de . et il n'y a pas le bon role (avec age)"],
    [17, "admin", "eliott.be", false, "pas de @ / pas le bon role (avec age)"],

    // Email invalide avec age valide
    [25, "user", "eliottgmail.com", false, "pas de @"],
    [25, "user", "eliott@gmailcom", false, "pas de ."],

    // age < 18
    [25, "stagiaire", "http://@eliott", false, "pas de ."],
    [25, "user", "eliott.be", false, "pas de @"],
    [25, "admin", "eliott@truc.be", true, "good"],

    // age > 120
    [121, "stagiaire", "eliott.be", "Âge invalide", "age trop grand"],
    [121, "user", "eliott@truc.be", "Âge invalide", "age trop grand"],
    [121, "admin", "http://@eliott", "Âge invalide", "age trop grand"],

    // pas d'age
    [NaN, "stagiaire", "eliott.be", "pas un Number", "NaN / pas de @"],
    [NaN, "user", "eliott@truc.be", "pas un Number", "NaN"],
    [NaN, "admin", "http://@eliott", "pas un Number", "NaN / pas de ."],

    // rôle invalide
    [25, "hacker", "eliott@truc.be", "Rôle invalide", "role invalide"]
];

describe("validateUserRegistration - 100% coverage", () => {
    test.each(userValidatorTest)(
        "%s",
        (age, role, email, attendu, description) => {
            if (typeof attendu === "string") {
                expect(() => validateUserRegistration(age as any, role as any, email as any)).toThrow(attendu);
            } else {
                expect(validateUserRegistration(age as any, role as any, email as any)).toBe(attendu);
            }
        }
    );
});