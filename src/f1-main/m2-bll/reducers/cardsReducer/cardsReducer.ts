import {Dispatch} from "redux";


const initState: InitStateType = {};

export const cardsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/CARD":
            return {...state}
        default:
            return state;
    }
};

// Action Creators
export const cardsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/CARD", data} as const;
};

// Thunk

export const cardsReducerTC = () => (dispatch: Dispatch) => {

};

// Types
export type InitStateType = {};
type ActionTypes = any;
