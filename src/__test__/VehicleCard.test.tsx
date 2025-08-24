// Example for Slider.test.ts
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import VehicleCard from '../components/VehicleCard'
import logo from '../assets/vehicles/select-a-car.png'
import type { EVModel } from '../type/types'

const mockModel: EVModel = {
    name: 'Chevy Bolt',
    kWhPerMile: 0.28,
    image: '/mock/chevy.png'
}


describe('VehicleCard', () => {
    it('renders the vehicle name', () => {
        render(<VehicleCard model={mockModel} />)

        expect(screen.getByText('Chevy Bolt')).toBeInTheDocument()
    })

    it('renders the correct image for a known model', () => {
        render(<VehicleCard model={mockModel} />)
        const img = screen.getByRole('img', { name: /chevy bolt/i })

        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', expect.stringContaining('chevy'))
    })

    it('renders the fallback image for an unknown model', () => {
        render(<VehicleCard model={{ name: 'Unknown EV', kWhPerMile: 0.3, image: '' }} />)
        const img = screen.getByRole('img', { name: /unknown ev/i })

        expect(img).toHaveAttribute('src', logo)
    })
})