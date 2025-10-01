import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VehicleSelect from '../components/VehicleSelect'

const evModels = [
    { name: 'Chevy Bolt', kWhPerMile: 0.28, image: 'chevy-bolt.png' },
    { name: 'Tesla Model 3', kWhPerMile: 0.24, image: 'tesla-model-3.png' },
    { name: 'Nissan Leaf', kWhPerMile: 0.30, image: 'nissan-leaf.png' }
]

describe('VehicleSelect', () => {
    it('renders all EV model options', async () => {
        render(
            <VehicleSelect
                selected=""
                onChange={() => {}}
                vehicles={evModels}
            />
        )
        // Placeholder should be present
        expect(screen.getByText('Vehicle')).toBeInTheDocument()
        // Open dropdown using combobox role
        await userEvent.click(screen.getByRole('combobox'))

        expect(await screen.getByText('Chevy Bolt')).toBeInTheDocument()
        expect(await screen.getByText('Tesla Model 3')).toBeInTheDocument()
        expect(await screen.getByText('Nissan Leaf')).toBeInTheDocument()
    })

    it('calls onChange when a model is selected', async () => {
        const handleChange = vi.fn()
        render(
            <VehicleSelect
                selected=""
                onChange={handleChange}
                vehicles={evModels}
            />
        )
        // Open dropdown and select an option
        await userEvent.click(screen.getByRole('combobox'))
        await userEvent.click(await screen.findByText('Tesla Model 3'))
        expect(handleChange).toHaveBeenCalledWith('Tesla Model 3')
    })

    it('shows the selected model', () => {
        render(
            <VehicleSelect
                selected="Nissan Leaf"
                onChange={() => {}}
                vehicles={evModels}
            />
        )
        // Selected value should be visible
        expect(screen.getByText('Nissan Leaf')).toBeInTheDocument()
    })
})