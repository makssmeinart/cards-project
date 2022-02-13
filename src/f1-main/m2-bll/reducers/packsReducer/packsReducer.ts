import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";
import {ThunkDispatch} from "redux-thunk";

const img = "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    //sort input
    packName: '',
    //sort btn
    sortedPackBtn: false,
    //range
    min: 0,
    max: 10,
    //delete pack
    id: "",
};

export const packsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...state, ...action.data}
        case "CARDS/PACKS/INPUT":
            return {...state, packName: action.value}
        case "CARDS/PACKS/BTN-SORTED":
            return {...state, sortedPackBtn: action.value}
        case "CARDS/PACKS/RANGE-VALUE":
            return {...state, min: action.min, max: action.max}
        case "CARDS/PACKS/DELETE":
            return {...state, id: action.idPack}

        default:
            return state;
    }
};


// Action Creators
export const packsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/PACKS", data} as const;
};
export const inputChangeHandlerAC = (value: string) => {
    return {type: "CARDS/PACKS/INPUT", value} as const
}
export const sortedPackBtnAC = (value: boolean) => {
    return {type: "CARDS/PACKS/BTN-SORTED", value} as const
}
export const rangeValueAC = (min: number, max: number) => {
    return {type: "CARDS/PACKS/RANGE-VALUE", min, max} as const
}
export const deletePackAC = (idPack: string) => {
    return {type: "CARDS/PACKS/DELETE", idPack} as const
}

// Thunk
export const fetchPacksTC = () => (dispatch: Dispatch, getState: () => RootAppStateType) => {
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
        console.log("getPacks", st)
    })

};
export const addPackTC = () => (dispatch: ThunkDispatch<RootAppStateType, void, any>, getState: () => RootAppStateType) => {
    const state = getState().packs

    const {packName} = state

    packsApi.addPack(packName, img, false)
        .then(res => {
            dispatch(fetchPacksTC())
        })
}
export const editPackTC = () => (dispatch: ThunkDispatch<RootAppStateType, void, any>, getState: () => RootAppStateType) => {
    const state = getState().packs

    const {packName} = state

    packsApi.editPack("12", packName)
        .then(res => {
            dispatch(fetchPacksTC())
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
    sortedPackBtn: boolean,
    min: number,
    max: number
    id: string
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
type deletePackACType = ReturnType<typeof deletePackAC>
type rangeValueACType = ReturnType<typeof rangeValueAC>
type inputChangeHandlerACType = ReturnType<typeof inputChangeHandlerAC>
export type sortedPackBtnACType = ReturnType<typeof sortedPackBtnAC>
type ActionTypes = packsReducerACType | inputChangeHandlerACType | sortedPackBtnACType | rangeValueACType | deletePackACType;
