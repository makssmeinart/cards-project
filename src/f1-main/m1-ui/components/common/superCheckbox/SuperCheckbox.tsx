import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";
import s from './SuperCheckbox.module.css'


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
}

export const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    return (
        <div className={s.checkboxesItem}>
            <label className={`${s.checkbox} ${s.styleE}`}>
                <input type={'checkbox'} onChange={onChangeCallback} {...restProps}/>
                <div className={s.checkboxCheckmark}/>
            </label>
        </div>
    )
}


// <label>
//     <input
//         className={s.l}
//         type={'checkbox'}
//         onChange={onChangeCallback}
//         {...restProps}
//     />
// </label>