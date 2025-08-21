import type { VehicleSelectProps } from '../../type/types'

export default function VehicleSelect({ selected, onChange, evModels }: VehicleSelectProps) {
  return (
    <label>
      EV Model:
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        {selected === '' && <option value="">-- Select a vehicle --</option>}
        {evModels.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>
    </label>
  )
}
