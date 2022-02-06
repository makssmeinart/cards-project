import s from "./snackbar.module.css"
import {useEffect} from "react";

export const Snackbar = ({open, autoHideDuration, onClose, error}: SnackbarPropsType) => {

    useEffect(() => {
       open && setTimeout(() => {
           onCloseCallback()
       }, autoHideDuration)
    }, [open])

    const onCloseCallback = () => {
        return onClose()
    }

    return (
        <>
            {
                open &&
                <div className={`${s.snackbar} ${s.show}`}>
                    <p>{error}</p>
                    <button className={s.close} onClick={onCloseCallback}>+</button>
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
    error: string
}