import React from "react";
import s from "./errorInput.module.css"

export const ErrorInput = ({error}: ErrorInputPropsType) => {
    return (
        <div className={s.error}>{error}</div>
    )
}

type ErrorInputPropsType = {
    error: string
}