import React from "react";

export const ErrorInput = ({error}: ErrorInputPropsType) => {
    return (
        <div style={{color: "red", height: "21px"}}>{error}</div>
    )
}

type ErrorInputPropsType = {
    error: string
}