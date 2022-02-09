import {Dispatch} from "redux";
import {authApi} from "../../../m3-dal/api";

const initState: InitStateType = {}

export const registerReducer = (state = initState, action: ActionType): InitStateType => {
    switch(action.type) {
        case "AUTH/REGISTER": {
            return {...state}
        }
        default: return state
    }
}

// Action Creators

export const RegisterAC = (data: any) => {
    return { type: "AUTH/REGISTER", data } as const
}

// Thunk

export const RegisterTC = (data: any) => (dispatch: Dispatch) => {
    authApi.register(data).then((res)=>{
        console.log(res)})
}

// Types

type ActionType = any

type InitStateType = any