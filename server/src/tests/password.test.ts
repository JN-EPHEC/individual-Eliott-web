import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
    
    it("devrait rejeter un mot de passe vide", () => {
        expect(validatePassword("", 25)).toBe(false); // Couvre Branch 1
    });

    // TEST 1 : Longueurs invalides (Trop court / Trop long)
    it("devrait valider les limites de longueur (8-20)", () => {
        expect(validatePassword("Ab1!", 25)).toBe(false);  // Trop court (<8) - Branch 2
        expect(validatePassword("A".repeat(21), 25)).toBe(false); // Trop long (>20) - Branch 3
    });

    // TEST 2 : Enfant (Age < 12) - Règles souples
    it("devrait gérer les règles pour Enfant (<12 ans)", () => {
        expect(validatePassword("uniquementminuscules", 10)).toBe(true); // Valide
        expect(validatePassword("12345678", 10)).toBe(false); // Échec : pas de minuscule - Branch 4
    });

    // TEST 3 : Adulte (12-64) - Manque de complexité (Maj/Min/Num)
    it("devrait rejeter un mot de passe Adulte sans complexité de base", () => {
        // Test de la Branch 5 (condition complexe : !hasUpperCase || !hasLowerCase || !hasNumbers)
        expect(validatePassword("toutenminuscule1", 25)).toBe(false); // Manque Majuscule
        expect(validatePassword("TOUTENMAJUSCULE1", 25)).toBe(false); // Manque Minuscule
        expect(validatePassword("MinusculeEtMaj", 25)).toBe(false);   // Manque Chiffre
    });

    // TEST 4 : Adulte (12-64) - Manque caractère spécial
    it("devrait rejeter un mot de passe Adulte sans caractère spécial", () => {
        expect(validatePassword("Password123", 30)).toBe(false); // Manque spécial - Branch 6
        expect(validatePassword("Password123!", 30)).toBe(true);  // Valide complet ! - Branch Final
    });

    // TEST 5 : Senior (>= 65) - Règles moyennes
    it("devrait gérer les règles pour Senior (>=65 ans)", () => {
        // Senior : échoue si NI chiffre NI majuscule
        expect(validatePassword("minuscules", 70)).toBe(false); // Branch 7
        expect(validatePassword("Minuscules", 70)).toBe(true);  // OK (Majuscule présente)
        expect(validatePassword("minuscul3", 70)).toBe(true);  // OK (Chiffre présent)
    });

    // TEST 6 : Cas limite d'âge (12 ans)
    it("devrait vérifier que 12 ans bascule bien dans la catégorie Adulte", () => {
        // À 12 ans, il faut le pack complet (Adulte)
        expect(validatePassword("abc123DEF!", 12)).toBe(true);
    });
});