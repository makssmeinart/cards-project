import {Dispatch} from "react";
import {authApi} from "../../../m3-dal/api";
import {RecoverPasswordFormValues} from "../../../../f2-pages/auth/recoverPassword/RecoverPassword";

const initState: InitStateTypes = {}

export const recoverPasswordReducer = (state = initState, action: ActionTypes): InitStateTypes => {
    switch(action.type) {

        default: return state
    }
}

// Action Creator

// Thunk

export const recoverPassword = (values: RecoverPasswordFormValues ,setEmailChecked: (emailChecked: boolean) => void) => (dispatch: Dispatch<ActionTypes>) => {
    return authApi.recoverPassword(values)
        .then(res => {
            setEmailChecked(false)
            alert(res.data.info)
        })
        .catch(err => {
            alert(`Display error: ${err}`)
        })
}

// Types

type ActionTypes = any

type InitStateTypes = any