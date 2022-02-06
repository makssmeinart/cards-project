import React from "react";

export const ErrorInput = ({error}: ErrorInputPropsType) => {
    return (
        <div style={{color: "red"}}>{error}</div>
    )
}

type ErrorInputPropsType = {
    error: string
}