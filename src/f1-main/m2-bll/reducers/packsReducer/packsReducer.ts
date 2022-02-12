import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";


const initState: InitStateType = {};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...state}
        default:
            return state;
    }
};

// Action Creators
export const packsReducerAC = (data: InitStateType) => {
    return {type: "APP/PACKS", data} as const;
};

// Thunk

export const packsReducerTC = () => (dispatch: Dispatch, getState: ()=> RootAppStateType) => {
};

// Types
export type InitStateType = {};
type ActionTypes = any;
