import { calculateShipping } from "../utils/shipping";

const shippingTest = [
    // [dist, poid, type, attendu, description]
    
    // --- 1. Tests sur la Distance (Poids < 10kg, Standard) ---
    [0, 5, 'standard', 10, 'Distance 0 km -> Prix 10€ (standard)'],
    [50, 5, 'standard', 10, 'Distance 50 km -> Prix 10€ (standard)'],
    [51, 5, 'standard', 25, 'Distance 51 km -> Prix 25€ (standard)'],
    [500, 5, 'standard', 25, 'Distance 500 km -> Prix 25€ (standard)'],
    [501, 5, 'standard', 50, 'Distance 501 km -> Prix 50€ (standard)'],

    // --- 2. Tests sur le Poids (Distance 10km, Standard) ---
    [10, 9, 'standard', 10, 'Poids 9 kg -> Pas de majoration (10€)'],
    [10, 10, 'standard', 15, 'Poids 10 kg -> Majoration 50% (15€)'],
    [10, 50, 'standard', 15, 'Poids 50 kg -> Majoration 50% (15€)'],

    // --- 3. Tests sur l'Option Express (Base 10€) ---
    [10, 5, 'express', 20, 'Type express -> Double le prix (20€)'],
    [10, 10, 'express', 30, 'Type express + Poids 10kg -> (10€ + 50%) * 2 = 30€'],

    // --- 4. Cas d'Erreurs (Exceptions) ---
    [-1, 5, 'standard', 'error', 'Distance négative -> Exception'],
    [10, 0, 'standard', 'error', 'Poids nul -> Exception'],
    [10, -5, 'standard', 'error', 'Poids négatif -> Exception'],
    [10, 51, 'standard', 'error', 'Poids > 50kg -> Livraison impossible']
];


describe('Shipping Calculator - Tests Fonctionnels', () => {
    test.each(shippingTest)(
        "%s",
        (dist, poid, type, attendu, description) => {
            if (attendu === 'error') {
                // Si on attend une erreur, on vérifie que la fonction "throw"
                expect(() => calculateShipping(dist as any, poid as any, type as any)).toThrow();
            } else {
                // Sinon on vérifie le calcul classique
                expect(calculateShipping(dist as any, poid as any, type as any)).toBe(attendu);
            }
        }
    );
});