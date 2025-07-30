import type { ResultSummaryProps } from '../../type/types'

export default function ResultSummary({ results }: ResultSummaryProps) {
    return (
        <div>
            <h2>Estimated Annual Savings</h2>
            <p><strong>Gas Cost:</strong> ${results.gasAnnualCost.toFixed(2)}</p>
            <p><strong>EV Cost:</strong> ${results.evAnnualCost.toFixed(2)}</p>
            <p><strong>Fuel Savings:</strong> ${results.fuelSavings.toFixed(2)}</p>
            <p><strong>Maintenance Savings:</strong> ${results.maintenanceSavings.toFixed(2)}</p>
            <h3><strong>Total Savings:</strong> ${results.totalSavings.toFixed(2)}</h3>
        </div>
    )
}
