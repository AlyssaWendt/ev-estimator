import { useState } from 'react'
import { calculateSavings } from '../../utils/calculateSavings'
import type { EstimateInput } from '../../utils/calculateSavings'
import ZipInput from './ZipInput'
import Slider from './Slider'
import ResultSummary from './Summary'
import type { ZappyData } from '../../type/types'
import mockData from '../../data/mockZappyData.json'
import styles from './estimator.module.scss'
import VehicleSelect from './VehicleSelect'

export default function Estimator() {
    const [error, setError] = useState<string | null>(null)
    const [milesPerDay, setMilesPerDay] = useState(30)
    const [mpg, setMPG] = useState(25)
    const [results, setResults] = useState<null | ReturnType<typeof calculateSavings>>(null)
    const [selectedModel, setSelectedModel] = useState('')
    const [zip, setZip] = useState('48101')

    // Find the entry for the current ZIP code
    const entry = (mockData as ZappyData[]).find((d) => d.zip === zip)

    const handleCalculate = () => {
    setError(null)
    if (!zip.match(/^\d{5}$/)) {
        setError('Please enter a valid 5-digit ZIP code.')
        setResults(null)
        return
    }
    if (milesPerDay < 0 || milesPerDay > 100) {
        setError('Miles per day must be between 0 and 100.')
        setResults(null)
        return
    }
    if (mpg < 10 || mpg > 60) {
        setError('MPG must be between 10 and 60.')
        setResults(null)
        return
    }

    const input: EstimateInput = {
        milesPerYear: milesPerDay * 365,
        mpg,
        gasCost: entry?.gasCostPerGallon ?? 4.0,
        electricityCost: entry?.electricityCostPerKWh ?? 0.20,
        kWhPerMile: 0.28,
        maintenanceSavingsPerYear: 500
    }

    setResults(calculateSavings(input))
  }

    return (
        <div className={styles.estimator}>
            <div className={styles.inputs}>
                <h1>EV Savings Estimator</h1>
                <p>See how much you could save with an EV.</p>
                <VehicleSelect
                    selected={selectedModel}
                    onChange={setSelectedModel}
                    evModels={entry?.evModels ?? []}
                />
                <ZipInput zip={zip} onChange={setZip} />
                <Slider
                label="Miles Driven Daily"
                min={0}
                max={100}
                value={milesPerDay}
                onChange={setMilesPerDay}
                unit="mi"
                />
                <Slider
                label="MPG (Gas Vehicle)"
                min={10}
                max={60}
                value={mpg}
                onChange={setMPG}
                unit="mpg"
                />

                <button onClick={handleCalculate}>Calculate</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>

            {results && <ResultSummary results={results} />}
        </div>
    )
}
