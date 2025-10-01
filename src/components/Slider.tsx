import type { SliderProps } from '../type/types'
import layout from '../features/estimator.module.scss'
import styles from './slider.module.scss'

export default function Slider({ label, min, max, value, onChange }: SliderProps) {
    return (
        <div className={layout.selectRow}>
            <label>
                <div className={styles.sliderLabel}>
                {label}
                </div>
                <div className={styles.sliderInputRow}>
                    <input
                        className={styles.sliderInput}
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                    /> 
                    <div className={styles.sliderValue}>{value}</div>
                </div>
            </label>
        </div>
    )
}
