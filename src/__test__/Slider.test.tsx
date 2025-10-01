import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Slider from '../components/Slider'

describe('Slider', () => {
    it('renders with correct label, value, and unit', () => {
        render(
            <Slider
                label="Miles Driven Daily"
                min={0}
                max={100}
                value={30}
                onChange={() => {}}
            />
        )
        expect(screen.getByText(/Miles Driven Daily/)).toBeInTheDocument()
        const input = screen.getByRole('slider') as HTMLInputElement
        expect(input.value).toBe('30')
        expect(input.min).toBe('0')
        expect(input.max).toBe('100')
    })

    it('calls onChange with the new value when changed', () => {
        const handleChange = vi.fn()
        render(
            <Slider
                label="MPG"
                min={10}
                max={60}
                value={25}
                onChange={handleChange}
            />
        )
        const input = screen.getByRole('slider')
        fireEvent.change(input, { target: { value: '40' } })
        expect(handleChange).toHaveBeenCalledWith(40)
    })

    it('renders without a unit if not provided', () => {
        render(
            <Slider
                label="Test Slider"
                min={0}
                max={10}
                value={5}
                onChange={() => {}}
            />
        )
        expect(screen.getByText('Test Slider')).toBeInTheDocument()
        expect(screen.getByText('5')).toBeInTheDocument()
    })
})