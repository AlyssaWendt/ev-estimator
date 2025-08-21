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
  kWhPerMile: number
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
    unit?: string
}

export interface VehicleSelectProps {
    selected: string
    onChange: (model: string) => void
    evModels: EVModel[]
}

export interface ZappyData {
    zip: string
    gasCostPerGallon: number
    electricityCostPerKWh: number
    evModels: EVModel[]
}

export interface ZipInputProps {
    zip: string
    onChange: (zip: string) => void
}
