// Example for Slider.test.ts
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ZipInput from '../components/ZipInput'

describe('ZipInput', () => {
    it('renders with the correct value', () => {
        render(<ZipInput zip="12345" onChange={() => {}} />)
        const input = screen.getByPlaceholderText(/Enter ZIP/i) as HTMLInputElement

        expect(input.value).toBe('12345')
    })

    it('calls onChange with the new value when changed', () => {
        const handleChange = vi.fn()
        render(<ZipInput zip="" onChange={handleChange} />)
        const input = screen.getByPlaceholderText(/Enter ZIP/i)
        fireEvent.change(input, { target: { value: '48101' } })

        expect(handleChange).toHaveBeenCalledWith('48101')
    })

    it('has maxlength and pattern attributes', () => {
        render(<ZipInput zip="" onChange={() => {}} />)
        const input = screen.getByPlaceholderText(/Enter ZIP/i)

        expect(input).toHaveAttribute('maxLength', '5')
        expect(input).toHaveAttribute('pattern', '\\d{5}')
    })
})