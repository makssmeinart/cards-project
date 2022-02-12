import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    token: "",
    tokenDeathTime: 0,
};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...action.data}
        default:
            return state;
    }
};


// Action Creators

export const packsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/PACKS", data} as const;
};

// Thunk

export const packsReducerTC = () => (dispatch: Dispatch, getState: ()=> RootAppStateType) => {


    packsApi.getPacks().then(res=> {
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
type ActionTypes = packsReducerACType;
