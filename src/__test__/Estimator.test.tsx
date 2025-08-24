import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Estimator from '../features/Estimator'

// Mock the image preloading and vehicle images to avoid errors
vi.mock('../utils/modelImageMap', () => ({
  preloadVehicleImages: vi.fn(),
  modelImageMap: {
    'Chevy Bolt': '/mock/chevy.png',
    'Tesla Model 3': '/mock/tesla.png',
    'Ford Mustang Mach-E': '/mock/ford.png',
    'Nissan Leaf': '/mock/nissan.png',
    'Volkswagen ID.4': '/mock/vw.png'
  }
}))

describe('Estimator', () => {
  it('renders all input fields and the calculate button', () => {
    render(<Estimator />)

    expect(screen.getByLabelText(/Miles Driven Daily/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/MPG \(Gas Vehicle\)/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/EV Model/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/ZIP/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /calculate/i })).toBeInTheDocument()
  })

  it('shows error for invalid ZIP code', async () => {
    render(<Estimator />)
    //Mock Valid Selections
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Chevy Bolt' } })
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    // Set invalid ZIP
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: 'abc' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const error = await screen.findByText(/Please enter a valid 5-digit ZIP code/i)

    expect(error).toBeInTheDocument()
  })

  it('shows results after valid calculation', async () => {
    render(<Estimator />)
    // Mock Valid Selections
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Chevy Bolt' } })
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '48101' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))

    expect(await screen.findByText(/Estimated Yearly Savings/i)).toBeInTheDocument()
  })

  it('shows error if no EV Model is selected', async () => {
    render(<Estimator />)
    //Mock Valid Selections
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '48101' } })
    // Set invalid EV Model
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: '' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const error = await screen.findByText(/Please select an EV Model/i)

    expect(error).toBeInTheDocument()
  })

  it('clears error when input becomes valid', async () => {
    render(<Estimator />)
    // Mock Valid Selections
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: '' } })
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '48101' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const error = await screen.findByText(/Please select an EV Model/i)

    expect(error).toBeInTheDocument()

    // Fix EV Model
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Chevy Bolt' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))

    expect(await screen.findByText(/Estimated Yearly Savings/i)).toBeInTheDocument()
  })

  it('hides results when inputs are invalid', async () => {
    render(<Estimator />)
    // Mock Valid Selections
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Chevy Bolt' } })
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '48101' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))

    expect(await screen.findByText(/Estimated Yearly Savings/i)).toBeInTheDocument()

    // Set invalid ZIP
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: 'abc' } })
    // Click calculate
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const error = await screen.findByText(/Please enter a valid 5-digit ZIP code/i)

    expect(error).toBeInTheDocument()
    expect(screen.queryByText(/Estimated Yearly Savings/i)).not.toBeInTheDocument()
  })

  it('shows error if ZIP code is not found in data', async () => {
    render(<Estimator />)
    // Set all other fields valid
    fireEvent.change(screen.getByLabelText(/EV Model/i), { target: { value: 'Chevy Bolt' } })
    fireEvent.change(screen.getByLabelText(/Miles Driven Daily/i), { target: { value: 30 } })
    fireEvent.change(screen.getByLabelText(/MPG/i), { target: { value: 25 } })
    // Enter a valid but unknown ZIP
    fireEvent.change(screen.getByLabelText(/ZIP/i), { target: { value: '99999' } })
    fireEvent.click(screen.getByRole('button', { name: /calculate/i }))
    const error = await screen.findByText(/ZIP code not found/i)
    expect(error).toBeInTheDocument()
  })
})
