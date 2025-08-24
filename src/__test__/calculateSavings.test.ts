import { describe, it, expect } from 'vitest'
import { calculateSavings } from '../utils/calculateSavings'

describe('calculateSavings', () => {
    it('calculates correct savings', () => {
        const input = {
            milesPerYear: 12000,
            mpg: 30,
            gasCost: 4,
            electricityCost: 0.15,
            kWhPerMile: 0.28,
            maintenanceSavingsPerYear: 500
        }
        const result = calculateSavings(input)
        expect(result.gasAnnualCost).toBeCloseTo(1600)
        expect(result.evAnnualCost).toBeCloseTo(504)
        expect(result.fuelSavings).toBeCloseTo(1096)
        expect(result.maintenanceSavings).toBe(500)
        expect(result.totalSavings).toBeCloseTo(1596)
    })

    it('uses default maintenanceSavings if not provided', () => {
        const input = {
            milesPerYear: 12000,
            mpg: 30,
            gasCost: 4,
            electricityCost: 0.15,
            kWhPerMile: 0.28
        }
        const result = calculateSavings(input)
        expect(result.maintenanceSavings).toBe(500)
    })

    it('calculates zero savings if costs are equal', () => {
        const input = {
            milesPerYear: 10000,
            mpg: 25,
            gasCost: 1.2,
            electricityCost: 0.12,
            kWhPerMile: 0.4,
            maintenanceSavingsPerYear: 0
        }
        const result = calculateSavings(input)
        expect(result.fuelSavings).toBeCloseTo(0)
        expect(result.totalSavings).toBeCloseTo(0)
    })
})