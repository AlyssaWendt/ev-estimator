import { useEffect, useState } from 'react'
import type { VehicleSelectProps } from '../type/types'
import Select from 'react-select'
import styles from './vehicleSelect.module.scss'

export default function VehicleSelect({ vehicles, selected, onChange }: VehicleSelectProps) {
    const [themeVars, setThemeVars] = useState({
        colorSecondary: '#e4e4e4',
        colorText: '#111827',
        colorElectricG: '#39FF14',
        fontGoogle: 'Tomorrow, sans-serif',
    });

    useEffect(() => {
        const root = document.documentElement;
        setThemeVars({
            colorSecondary: getComputedStyle(root).getPropertyValue('--color-secondary').trim() || '#e4e4e4',
            colorText: getComputedStyle(root).getPropertyValue('--color-text').trim() || '#111827',
            colorElectricG: getComputedStyle(root).getPropertyValue('--color-electricG').trim() || '#39FF14',
            fontGoogle: getComputedStyle(root).getPropertyValue('--font-google').trim() || 'Tomorrow, sans-serif',
        });
    }, []);

    const options = vehicles.map((model: { name: any; }) => ({
        value: model.name,
        label: model.name
    }));

    return (
        <div className={styles.selectContainer}>
            <Select
                options={options}
                value={options.find((opt: { value: string; }) => opt.value === selected) || null}
                onChange={opt => onChange(opt ? opt.value : '')}
                placeholder="Vehicle"
                classNamePrefix="customSelect"
                styles={{
                    control: (base) => ({
                        ...base,
                        background: themeVars.colorSecondary,
                        borderColor: themeVars.colorText,
                        borderWidth: 2,
                        fontFamily: themeVars.fontGoogle,
                        fontSize: 16,
                        width: '280px',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: themeVars.colorText,
                        },
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? themeVars.colorElectricG : '#fff',
                        color: themeVars.colorText,
                        fontFamily: themeVars.fontGoogle,
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: themeVars.colorText,
                    }),
                }}
            />
        </div>
    );
}
