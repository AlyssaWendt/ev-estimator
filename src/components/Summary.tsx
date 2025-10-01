import { useState } from 'react'
import type { ResultSummaryProps } from '../type/types'
import layout from '../features/estimator.module.scss'
import styles from './summary.module.scss'

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
        <div className={layout.resultsCard}>
            <div className={styles.tabs}>
                <div className={styles.tabButtons}>
                    {TABS.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={activeTab === tab.value ? styles.active : ''}
                        >
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            <h2 className={styles.summaryTitle}> Estimated {TABS.find(t => t.value === activeTab)?.label} Savings</h2>
            <div className={styles.statList}>
                <div className={styles.statSavingItem}>
                    <span className={styles.label}><strong>Total Savings:</strong></span>
                    <span className={styles.value}><strong>${summary.totalSavings.toFixed(2)}</strong></span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.label}>Gas Cost:</span>
                    <span className={styles.value}>${summary.gasAnnualCost.toFixed(2)}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.label}>EV Cost:</span>
                    <span className={styles.value}>${summary.evAnnualCost.toFixed(2)}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.label}>Fuel Savings:</span>
                    <span className={styles.value}>${summary.fuelSavings.toFixed(2)}</span>
                </div>
                <div className={styles.statItem}>
                    <span className={styles.label}>Maintenance Savings:</span>
                    <span className={styles.value}>${summary.maintenanceSavings.toFixed(2)}</span>
                </div>

            </div>
        </div>
    )
}
