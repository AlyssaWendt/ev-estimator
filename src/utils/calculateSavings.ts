import type { EstimateInput } from '../type/types'

export function calculateSavings({
    milesPerYear,
    mpg,
    gasCost,
    electricityCost,
    kWhPerMile,
    maintenanceSavingsPerYear = 500
}: EstimateInput) {
    const gasAnnualCost = (milesPerYear / mpg) * gasCost
    const evAnnualCost = milesPerYear * kWhPerMile * electricityCost
    const fuelSavings = gasAnnualCost - evAnnualCost
    const totalSavings = fuelSavings + maintenanceSavingsPerYear

    return {
        gasAnnualCost,
        evAnnualCost,
        fuelSavings,
        maintenanceSavings: maintenanceSavingsPerYear,
        totalSavings
    }
}
