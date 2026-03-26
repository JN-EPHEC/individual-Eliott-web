import { calculateShipping } from "../utils/shipping";

const shippingTest = [
    // [dist, poid, type, attendu, description]
    
    // Test des Exceptions (Branches 1 & 2)
    [-1, 5, 'standard', 'Invalid distance', 'ID1: Distance négative'],
    [10, 0, 'standard', 'Invalid weight', 'ID2: Poids nul ou négatif'],
    [10, 51, 'standard', 'Invalid weight', 'ID3: Poids trop lourd'],

    // Test de la Logique de Calcul (Branches 3, 4 et multiplicateurs)
    [50, 5, 'standard', 10, 'ID4: Zone 1 + Léger + Standard'],
    [500, 10, 'express', 75, 'ID5: Zone 2 + Lourd + Express (25 * 1.5 * 2)'],
    [501, 10, 'standard', 75, 'ID6: Zone 3 + Lourd + Standard (50 * 1.5)']
];

describe('Shipping Calculator - 100% Coverage en 6 tests', () => {
    test.each(shippingTest)(
        "%s",
        (dist, poid, type, attendu, description) => {
            if (typeof attendu === 'string') {
                // Vérifie que l'erreur est bien levée avec le bon message
                expect(() => 
                    calculateShipping(dist as any, poid as any, type as any)
                ).toThrow(attendu);
            } else {
                // Vérifie le calcul exact
                expect(
                    calculateShipping(dist as any, poid as any, type as any)
                ).toBe(attendu);
            }
        }
    );
});