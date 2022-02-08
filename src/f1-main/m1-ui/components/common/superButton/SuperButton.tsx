import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./superButton.module.css"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>;

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean,
    className?: string,
};

export const SuperButton: React.FC<SuperButtonPropsType> = ({
                                                                className,
                                                                ...restProps
                                                            }) => {
    const moduleStyles = className ? className : ""

    return <button className={s[moduleStyles]} {...restProps} />;
};
