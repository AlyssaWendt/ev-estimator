import { useState } from 'react'
import { calculateSavings } from '../../utils/calculateSavings'
import styles from './estimator.module.scss'

export default function Estimator() {

    return (
        <div className={styles.estimator}>
            <h2>EV Cost Savings Estimator</h2>
        </div>
    )
}