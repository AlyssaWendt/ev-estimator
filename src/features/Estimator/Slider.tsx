import type { SliderProps } from '../../type/types'

export default function Slider({ label, min, max, value, onChange, unit = '' }: SliderProps) {
    return (
        <label>
            {label}: {value} {unit}
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </label>
    )
}
