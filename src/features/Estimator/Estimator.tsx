import { useState } from 'react'
import { calculateSavings } from '../../utils/calculateSavings'
import type { EstimateInput } from '../../utils/calculateSavings'
import type { ZappyData } from '../../type/ZappyData'
import mockData from '../../data/mockZappyData.json'
import styles from './estimator.module.scss'

export default function Estimator() {
    const [zip, setZip] = useState('48101')
    const [milesPerDay, setMilesPerDay] = useState(30)
    const [mpg, setMPG] = useState(25)
    const [results, setResults] = useState<null | ReturnType<typeof calculateSavings>>(null)
    const [error, setError] = useState<string | null>(null)

    const handleCalculate = () => {
        setError(null)
        // Basic ZIP validation
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

        const entry = (mockData as ZappyData[]).find((d) => d.zip === zip)
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

                <label>
                    Zip Code:
                    <input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="Enter ZIP"
                        maxLength={5}
                        pattern="\d{5}"
                    />
                </label>

                <label>
                    Miles Driven Daily: {milesPerDay}
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={milesPerDay}
                        onChange={(e) => setMilesPerDay(Number(e.target.value))}
                    />
                </label>

                <label>
                    MPG (Gas Vehicle): {mpg}
                    <input
                        type="range"
                        min={10}
                        max={60}
                        value={mpg}
                        onChange={(e) => setMPG(Number(e.target.value))}
                    />
                </label>

                <button onClick={handleCalculate}>Calculate</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>

            {results && (
                <div className={styles.results}>
                    <h2>Estimated Annual Savings</h2>
                    <p><strong>Gas Cost:</strong> ${results.gasAnnualCost.toFixed(2)}</p>
                    <p><strong>EV Cost:</strong> ${results.evAnnualCost.toFixed(2)}</p>
                    <p><strong>Fuel Savings:</strong> ${results.fuelSavings.toFixed(2)}</p>
                    <p><strong>Maintenance Savings:</strong> ${results.maintenanceSavings.toFixed(2)}</p>
                    <h3><strong>Total Savings:</strong> ${results.totalSavings.toFixed(2)}</h3>
                </div>
            )}
        </div>
    )
}
