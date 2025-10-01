import { modelImageMap } from '../utils/modelImageMap'
import type { EVModel } from '../type/types'

export const evModels: EVModel[] = [
    { name: 'Chevy Bolt', image: modelImageMap['Chevy Bolt'] },
    { name: 'Tesla Model 3', image: modelImageMap['Tesla Model 3'] },
    { name: 'Ford Mustang Mach-E', image: modelImageMap['Ford Mustang Mach-E'] },
    { name: 'Nissan Leaf', image: modelImageMap['Nissan Leaf'] },
    { name: 'Volkswagen ID.4', image: modelImageMap['Volkswagen ID.4'] }
]