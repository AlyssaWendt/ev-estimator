// figure out where these interfaces need to go. See if the EVMODELS
// can for in the mockZappyData file
// then update Estimator.tsx to use the new VehicleSelect component
import type { VehicleSelectProps } from '../../type/types'


export default function VehicleSelect({ selected, onChange, evModels }: VehicleSelectProps) {
    return (
        <label>
            EV Model:
            <select value={selected} onChange={(e) => onChange(e.target.value)}>
                {evModels.map((model) => (
                    <option key={model.name} value={model.name}>
                        {model.name}
                    </option>
                ))}
            </select>
        </label>
    )
}
