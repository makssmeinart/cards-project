import {Dispatch} from "react";
import {authApi} from "../../../m3-dal/api";
import {RecoverPasswordFormValues} from "../../../../f2-pages/auth/recoverPassword/RecoverPassword";
import {changeStatus} from "../appReducer/appReducer";

const initState: InitStateTypes = {}

export const recoverPasswordReducer = (state = initState, action: ActionTypes): InitStateTypes => {
    switch(action.type) {

        default: return state
    }
}

// Action Creator

// Thunk

export const recoverPassword = (values: RecoverPasswordFormValues ,setEmailChecked: (emailChecked: boolean) => void) => (dispatch: Dispatch<ActionTypes>) => {
    // Request send turn on spinner
    dispatch(changeStatus("loading"))

    return authApi.recoverPassword(values)
        .then(res => {
            // On success turn off spinner
            dispatch(changeStatus("completed"))
            setEmailChecked(false)
            alert(res.data.info)
        })
        .catch(err => {
            // On error turn off spinner
            dispatch(changeStatus("failed"))
            alert(`Display error: ${err}`)
        })
        .finally(() => {
            dispatch(changeStatus("idle"))
        })
}

// Types

type ActionTypes = any

type InitStateTypes = any