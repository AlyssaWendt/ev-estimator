import { modelImageMap } from '../utils/modelImageMap'
import type { EVModel } from '../type/types'

export const evModels: EVModel[] = [
    { name: 'Chevy Bolt', kWhPerMile: 0.28, image: modelImageMap['Chevy Bolt'] },
    { name: 'Tesla Model 3', kWhPerMile: 0.24, image: modelImageMap['Tesla Model 3'] },
    { name: 'Ford Mustang Mach-E', kWhPerMile: 0.31, image: modelImageMap['Ford Mustang Mach-E'] },
    { name: 'Nissan Leaf', kWhPerMile: 0.30, image: modelImageMap['Nissan Leaf'] },
    { name: 'Volkswagen ID.4', kWhPerMile: 0.29, image: modelImageMap['Volkswagen ID.4'] }
]