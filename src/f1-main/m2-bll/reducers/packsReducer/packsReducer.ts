import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";
import {ThunkDispatch} from "redux-thunk";

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 10,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    packName: '',
    sortedPackBtn: false,
};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...state, ...action.data}
        case "CARDS/INPUT":
            return {...state, packName: action.value}
        case "CARDS/BTN-SORTED":
            return {...state, sortedPackBtn: action.value}
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


// Thunk
export const packsReducerTC = () => (dispatch: Dispatch, getState: ()=> RootAppStateType) => {
    const state = getState().packs
    const switcherBtn = getState().packs.sortedPackBtn

    let user_id = "";
    if(!switcherBtn) {
        user_id = ""
    } else {
         user_id = getState().login._id
    }

    const {packName, minCardsCount, maxCardsCount, page, pageCount } = state

    packsApi.getPacks(packName, minCardsCount,maxCardsCount, "" , page,pageCount, user_id).then(res=> {
        dispatch(packsReducerAC(res.data))
        const st = getState().packs
        console.log("getState()",st)
    })
}
export const addPackTC = () => (dispatch: ThunkDispatch<RootAppStateType,void, ActionTypes>) => {

    packsApi.addPack("NewDeck", "picture", false).then(resp => {
        dispatch(packsReducerTC())
    })
}

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
    sortedPackBtn: boolean

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
type inputChangeHandlerACType = ReturnType<typeof inputChangeHandlerAC>
export type sortedPackBtnACType = ReturnType<typeof sortedPackBtnAC>
type ActionTypes = packsReducerACType | inputChangeHandlerACType | sortedPackBtnACType;
