import { useState } from 'react'
import type { ResultSummaryProps } from '../../type/types'

const TABS = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
    { label: '5 Years', value: 'fiveYears' }
]

export default function ResultSummary({ results }: ResultSummaryProps) {
    const [activeTab, setActiveTab] = useState('yearly')

    const getSummary = () => {
        switch (activeTab) {
            case 'monthly':
                return {
                    gasAnnualCost: results.gasAnnualCost / 12,
                    evAnnualCost: results.evAnnualCost / 12,
                    fuelSavings: results.fuelSavings / 12,
                    maintenanceSavings: results.maintenanceSavings / 12,
                    totalSavings: results.totalSavings / 12
                }
            case 'fiveYears':
                return {
                    gasAnnualCost: results.gasAnnualCost * 5,
                    evAnnualCost: results.evAnnualCost * 5,
                    fuelSavings: results.fuelSavings * 5,
                    maintenanceSavings: results.maintenanceSavings * 5,
                    totalSavings: results.totalSavings * 5
                }
            default:
                return results  
        }
    }

    const summary = getSummary()

    return (
        <div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        style={{
                            fontWeight: activeTab === tab.value ? 'bold' : 'normal',
                            textDecoration: activeTab === tab.value ? 'underline' : 'none'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <h2>Estimated {TABS.find(t => t.value === activeTab)?.label} Savings</h2>
            <p><strong>Gas Cost:</strong> ${summary.gasAnnualCost.toFixed(2)}</p>
            <p><strong>EV Cost:</strong> ${summary.evAnnualCost.toFixed(2)}</p>
            <p><strong>Fuel Savings:</strong> ${summary.fuelSavings.toFixed(2)}</p>
            <p><strong>Maintenance Savings:</strong> ${summary.maintenanceSavings.toFixed(2)}</p>
            <h3><strong>Total Savings:</strong> ${summary.totalSavings.toFixed(2)}</h3>
        </div>
    )
}
