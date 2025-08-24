import { modelImageMap } from '../utils/modelImageMap'
import type { EVModel } from '../type/types'
import logo from '../assets/vehicles/select-a-car.png'

interface VehicleCardProps {
  model: EVModel
}

export default function VehicleCard({ model }: VehicleCardProps) {
   const image = modelImageMap[model.name] ?? logo

  return (
    <div className='vehicle-card'>
        <h4>{model.name}</h4>
        <img
        src={image}
        alt={model.name}
        style={{ width: '100%', maxWidth: '400px', borderRadius: '8px', backgroundColor: 'transparent' }}
        />
      
    </div>
  )
}
