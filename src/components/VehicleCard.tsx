
import { modelImageMap } from '../utils/modelImageMap'
import type { EVModel } from '../type/types'
import logo from '../assets/vehicles/select-a-car.png'
import styles from '../features/estimator.module.scss'

interface VehicleCardProps {
  model: EVModel
}

export default function VehicleCard({ model }: VehicleCardProps) {
  const image = modelImageMap[model.name] ?? logo

  return (
    <div className={styles.vehicleCard}>
      <img
        className={styles.vehicleImg}
        src={image}
        alt={model.name}
      />
    </div>
  )
}
