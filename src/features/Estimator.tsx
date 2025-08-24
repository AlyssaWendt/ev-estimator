import { useEffect, useState } from 'react'
import ResultSummary from '../components/Summary'
import Slider from '../components/Slider'
import VehicleCard from '../components/VehicleCard'
import VehicleSelect from '../components/VehicleSelect'
import ZipInput from '../components/ZipInput'
import { evModels } from '../data/evModels'
import mockData from '../data/mockZappyData.json'
import styles from './estimator.module.scss'
import { preloadVehicleImages } from '../utils/modelImageMap'
import { calculateSavings } from '../utils/calculateSavings'
import type { EstimateInput, ZappyData } from '../type/types'

export default function Estimator() {
    const [error, setError] = useState<string | null>(null)
    const [milesPerDay, setMilesPerDay] = useState(30)
    const [mpg, setMPG] = useState(25)
    const [results, setResults] = useState<null | ReturnType<typeof calculateSavings>>(null)
    const [selectedModel, setSelectedModel] = useState('')
    const [zip, setZip] = useState('48101')

    const zipData: ZappyData[] = mockData as ZappyData[]
    const entry = zipData.find(z => z.zip === zip)
     const selectedEV = evModels.find((m) => m.name === selectedModel)

    const handleCalculate = () => {
        setError(null)

        if (!zip.match(/^\d{5}$/)) {
            setError('Please enter a valid 5-digit ZIP code.')
            setResults(null)
            return
        }
        if (!entry) {
            setError('ZIP code not found. Please enter a valid ZIP code(48101, 90210, 60606).')
            setResults(null)
            return
        }        
        if (entry.gasCostPerGallon == null || entry.electricityCostPerKWh == null) {
            setError('ZIP code data is incomplete.')
            setResults(null)
            return
        }
        if (!selectedModel) {
            setError('Please select an EV model.')
            setResults(null)
            return
        }
        if (!selectedEV) {
            setError('Selected EV model not found.')
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
        gasCost: entry.gasCostPerGallon,
        electricityCost: entry.electricityCostPerKWh,
        kWhPerMile: selectedEV.kWhPerMile,
        maintenanceSavingsPerYear: 500
    }

    setResults(calculateSavings(input))
    }

    useEffect(() => {
        preloadVehicleImages()
    }, [])

    return (
        <div className='container-main'>
            <div className='estimator'>
                <h1>EV Savings Estimator</h1>
                <p>See how much you could save with an EV.</p>
                <VehicleSelect
                    selected={selectedModel}
                    onChange={value => {
                        setSelectedModel(value)
                        setError(null)
                    }}
                    evModels={evModels}
                />
                <VehicleCard model={selectedEV ?? { name: 'Select a model', kWhPerMile: 0.28, image: '' }} />
                <ZipInput zip={zip} onChange={value => {
                    setZip(value)
                    setError(null)
                }} />
                <Slider
                    label="Miles Driven Daily"
                    min={0}
                    max={100}
                    value={milesPerDay}
                    onChange={value => {
                        setMilesPerDay(value)
                        setError(null)
                    }}
                    unit="mi"
                />
                <Slider
                    label="MPG (Gas Vehicle)"
                    min={10}
                    max={60}
                    value={mpg}
                    onChange={value => {
                        setMPG(value)
                        setError(null)
                    }}
                    unit="mpg"
                />

                <button className='calculate-button' onClick={handleCalculate}>Calculate</button>
                {error && <p className={styles.error}>{error}</p>}
            </div>

            {results && <ResultSummary results={results} />}
        </div>
    )
}
