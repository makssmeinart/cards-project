import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        className,
        ...restProps
    }
) => {

    return (
        <button
            {...restProps}
        />
    )
}

