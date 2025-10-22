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

    const [selectWidth, setSelectWidth] = useState('280px');
    const [fontSize, setFontSize] = useState(16);
    const [paddingInline, setPaddingInline] = useState(12);
    const [height, setHeight] = useState('30px');

    useEffect(() => {
        const root = document.documentElement;
        setThemeVars({
            colorSecondary: getComputedStyle(root).getPropertyValue('--color-secondary').trim() || '#e4e4e4',
            colorText: getComputedStyle(root).getPropertyValue('--color-text').trim() || '#111827',
            colorElectricG: getComputedStyle(root).getPropertyValue('--color-electricG').trim() || '#39FF14',
            fontGoogle: getComputedStyle(root).getPropertyValue('--font-google').trim() || 'Tomorrow, sans-serif',
        });

        const updateResponsive = () => {
            const width = window.innerWidth;
            
            if (width <= 299) {
                setSelectWidth('200px');
                setFontSize(12);
                setPaddingInline(8);
                setHeight('26px');
            } else if (width <= 599) {
                setSelectWidth('220px');
                setFontSize(13);
                setPaddingInline(9);
                setHeight('27px');
            } else if (width <= 899) { 
                setSelectWidth('240px');
                setFontSize(14);
                setPaddingInline(10);
                setHeight('28px');
            } else if (width <= 1199) {
                setSelectWidth('260px');
                setFontSize(15);
                setPaddingInline(11);
                setHeight('29px');
            } else {
                setSelectWidth('280px');
                setFontSize(16);
                setPaddingInline(12);
                setHeight('30px');
            }
        };

        updateResponsive();
        window.addEventListener('resize', updateResponsive);
        return () => window.removeEventListener('resize', updateResponsive);
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
                        fontSize: fontSize,
                        width: selectWidth,
                        minWidth: selectWidth,
                        maxWidth: selectWidth,
                        height: height,
                        minHeight: height,
                        padding: '0',
                        boxSizing: 'border-box',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: themeVars.colorText,
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: `0 ${paddingInline}px`,
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                    }),
                    input: (base) => ({
                        ...base,
                        margin: '0',
                        padding: '0',
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? themeVars.colorElectricG : '#fff',
                        color: themeVars.colorText,
                        fontFamily: themeVars.fontGoogle,
                        fontSize: fontSize,
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: themeVars.colorText,
                        margin: '0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: `calc(100% - 20px)`,
                    }),
                    indicatorsContainer: (base) => ({
                        ...base,
                        height: '100%',
                        paddingRight: `${paddingInline}px`,
                    }),
                }}
            />
        </div>
    );
}
