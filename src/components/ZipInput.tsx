import type { ZipInputProps } from '../type/types'
import layout from '../features/estimator.module.scss'
import styles from './zipInput.module.scss'


export default function ZipInput({ zip, onChange }: ZipInputProps) {
  return (
    <div className={layout.zipRow}>
        <input
          className={styles.zipInput}
          type="text"
          value={zip}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Your ZIP code"
          maxLength={5}
          pattern="\d{5}"
        />
    </div>
  )
}
