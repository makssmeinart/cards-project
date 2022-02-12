import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    filter: ''
};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...action.data}
        case "CARDS/INPUT":
            return {...state, filter: action.value}
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

// Thunk
export const packsReducerTC = () => (dispatch: Dispatch, getState: ()=> RootAppStateType) => {
    debugger
    const state = getState().packs
    const uID = getState().login._id
    const {filter, minCardsCount, maxCardsCount, page, pageCount } = state

    packsApi.getPacks(filter, minCardsCount, maxCardsCount, "" , page,pageCount).then(res=> {
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
    filter: string

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
type ActionTypes = packsReducerACType | inputChangeHandlerACType;
