// API and data models

export interface EstimateInput {
    milesPerYear: number
    mpg: number
    gasCost: number
    electricityCost: number
    kWhPerMile: number
    maintenanceSavingsPerYear?: number
}

export interface EVModel {
  name: string
  image: string
}

export interface ResultSummaryProps {
    results: {
        gasAnnualCost: number
        evAnnualCost: number
        fuelSavings: number
        maintenanceSavings: number
        totalSavings: number
    }
}

export interface SliderProps {
    label: string
    min: number
    max: number
    value: number
    onChange: (val: number) => void
}

export interface VehicleSelectProps {
    selected: string
    onChange: (model: string) => void
    vehicles: { name: string; kWhPerMile: number }[];
}

export interface ZappyData {
    zip: string
    gasCostPerGallon: number
    electricityCostPerKWh: number
    vehicles: { name: string; kWhPerMile: number }[];
}

export interface ZipInputProps {
    zip: string
    onChange: (zip: string) => void
}
