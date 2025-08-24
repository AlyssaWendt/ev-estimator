// Example for Slider.test.ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import VehicleSelect from '../components/VehicleSelect'

const evModels = [
    { name: 'Chevy Bolt', kWhPerMile: 0.28, image: 'chevy-bolt.png' },
    { name: 'Tesla Model 3', kWhPerMile: 0.24, image: 'tesla-model-3.png' },
    { name: 'Nissan Leaf', kWhPerMile: 0.30, image: 'nissan-leaf.png' }
]

describe('VehicleSelect', () => {
    it('renders all EV model options', () => {
        render(
            <VehicleSelect
                selected=""
                onChange={() => {}}
                evModels={evModels}
            />
        )
        expect(screen.getByText('-- Select a vehicle --')).toBeInTheDocument()
        expect(screen.getByText('Chevy Bolt')).toBeInTheDocument()
        expect(screen.getByText('Tesla Model 3')).toBeInTheDocument()
        expect(screen.getByText('Nissan Leaf')).toBeInTheDocument()
    })

    it('calls onChange when a model is selected', () => {
        const handleChange = vi.fn()
        render(
            <VehicleSelect
                selected=""
                onChange={handleChange}
                evModels={evModels}
            />
        )
        fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Tesla Model 3' } })
        expect(handleChange).toHaveBeenCalledWith('Tesla Model 3')
    })

    it('shows the selected model', () => {
        render(
            <VehicleSelect
                selected="Nissan Leaf"
                onChange={() => {}}
                evModels={evModels}
            />
        )
        const select = screen.getByLabelText(/EV Model/i) as HTMLSelectElement
        expect(select.value).toBe('Nissan Leaf')
    })
})