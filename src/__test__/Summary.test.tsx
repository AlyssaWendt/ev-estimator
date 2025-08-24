// Example for Slider.test.ts
import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ResultSummary from '../components/Summary'

const mockResults = {
  gasAnnualCost: 1200,
  evAnnualCost: 600,
  fuelSavings: 600,
  maintenanceSavings: 500,
  totalSavings: 1100
}

describe('ResultSummary', () => {
    it('renders yearly savings by default', () => {
        render(<ResultSummary results={mockResults} />)

        expect(screen.getByText(/Estimated Yearly Savings/i)).toBeInTheDocument()
        expect(screen.getByText(/\$1200\.00/)).toBeInTheDocument()
        expect(screen.getAllByText(/\$600\.00/)).toHaveLength(2)
        expect(screen.getByText(/\$500\.00/)).toBeInTheDocument()
        expect(screen.getByText(/\$1100\.00/)).toBeInTheDocument()
    })

    it('shows monthly savings when Monthly tab is clicked', () => {
        render(<ResultSummary results={mockResults} />)
        fireEvent.click(screen.getByRole('button', { name: /Monthly/i }))

        expect(screen.getByText(/Estimated Monthly Savings/i)).toBeInTheDocument()
        expect(screen.getByText(/\$100\.00/)).toBeInTheDocument()
        expect(screen.getAllByText(/\$50\.00/)).toHaveLength(2)
        expect(screen.getByText(/\$41\.67/)).toBeInTheDocument()
        expect(screen.getByText(/\$91\.67/)).toBeInTheDocument()
    })

    it('shows 5 year savings when 5 Years tab is clicked', () => {
        render(<ResultSummary results={mockResults} />)
        fireEvent.click(screen.getByRole('button', { name: /5 Years/i }))

        expect(screen.getByText(/Estimated 5 Years Savings/i)).toBeInTheDocument()
        expect(screen.getByText(/\$6000\.00/)).toBeInTheDocument()
        expect(screen.getAllByText(/\$3000\.00/)).toHaveLength(2)
        expect(screen.getByText(/\$2500\.00/)).toBeInTheDocument()
        expect(screen.getByText(/\$5500\.00/)).toBeInTheDocument()
    })
})