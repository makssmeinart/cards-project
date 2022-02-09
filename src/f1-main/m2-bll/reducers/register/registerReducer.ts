import {Dispatch} from "redux";
import {authApi} from "../../../m3-dal/api";
import {changeStatus, setIsLoggedInAC} from "../appReducer/appReducer";
import {serverErrorHandling} from "../../../m4-utility/serverErrorHandling";

const initState: InitStateType = {}

export const registerReducer = (state = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        case "AUTH/REGISTER": {
            return {...state}
        }
        default:
            return state
    }
}

// Action Creators

export const RegisterAC = (data: any) => {
    return {type: "AUTH/REGISTER", data} as const
}

// Thunk

export const RegisterTC = (data: any, setIsSuccessRegister: any) => (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"))
    authApi.register(data).then((res) => {
        dispatch(changeStatus("completed"))
        dispatch(setIsLoggedInAC(false))
        setIsSuccessRegister(true)
    }).catch((e) => {
        dispatch(changeStatus('failed'))
        serverErrorHandling(e, dispatch)
    }).finally(()=> {
        dispatch(changeStatus("idle"))
    })
}

// Types

type ActionType = any

type InitStateType = any