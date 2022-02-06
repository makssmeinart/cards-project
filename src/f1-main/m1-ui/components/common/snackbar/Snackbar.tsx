import s from "./snackbar.module.css"
import {useEffect} from "react";

export const Snackbar = ({open, autoHideDuration, onClose}: SnackbarPropsType) => {

    useEffect(() => {
        console.log("Runs")
        setTimeout(() => {
            onCloseCallback()
        }, autoHideDuration)
    }, [autoHideDuration])

    const onCloseCallback = () => {
        return onClose()
    }

    return (
        <>
            {
                open &&
                <div className={`${s.snackbar} ${s.show}`}>
                    <span>Icons</span>
                    <p>Text</p>
                    <button onClick={onCloseCallback}>Close</button>
                </div>
            }
        </>
    )
}

// Types

type SnackbarPropsType = {
    open: boolean
    autoHideDuration?: number
    onClose: () => void
}