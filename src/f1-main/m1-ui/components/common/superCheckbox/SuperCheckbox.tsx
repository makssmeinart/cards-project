import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from "react";

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
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}

                {...restProps}
            />
        </label>
    )
}