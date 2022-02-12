import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 100,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    packName: '',
    sortedPackBtn: false,
    min: 0,
    max: 10
};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...state, ...action.data}
        case "CARDS/INPUT":
            return {...state, packName: action.value}
        case "CARDS/BTN-SORTED":
            return {...state, sortedPackBtn: action.value}
        case "CARD/RANGE-VALUE":
            return {...state, min: action.min, max: action.max}
        default:
            return state;
    }
};


// Action Creators
export const packsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/PACKS", data} as const;
};
export const inputChangeHandlerAC = (value: string) => {
    return {type: "CARDS/INPUT", value} as const
}
export const sortedPackBtnAC = (value: boolean) => {
    return {type: "CARDS/BTN-SORTED", value} as const
}
export const rangeValueAC = (min: number, max: number) => {
    debugger
    return {type: "CARD/RANGE-VALUE", min, max} as const
}

// Thunk
export const packsReducerTC = () => (dispatch: Dispatch, getState: ()=> RootAppStateType) => {
    const state = getState().packs
    const switcherBtn = getState().packs.sortedPackBtn

    let user_id = "";
    if (!switcherBtn) {
        user_id = ""
    } else {
        user_id = getState().login._id
    }


    const {packName, min, max, page, pageCount} = state

    packsApi.getPacks(packName, min, max, "", page, pageCount, user_id).then(res => {
        dispatch(packsReducerAC(res.data))
        const st = getState().packs
        console.log("getState()",st)
    })

};

// Types
export type InitStateType = {
    cardPacks: cardPacksType[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
    packName: string
    sortedPackBtn: boolean,
    min: number,
    max: number

};
export type cardPacksType = {
    cardsCount: number
    created: string
    deckCover: string
    grade: number
    more_id: string
    name: string
    path: string
    private: false
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type packsReducerACType = ReturnType<typeof packsReducerAC>
type rangeValueACType = ReturnType<typeof rangeValueAC>
type inputChangeHandlerACType = ReturnType<typeof inputChangeHandlerAC>
export type sortedPackBtnACType = ReturnType<typeof sortedPackBtnAC>
type ActionTypes = packsReducerACType | inputChangeHandlerACType | sortedPackBtnACType | rangeValueACType;
