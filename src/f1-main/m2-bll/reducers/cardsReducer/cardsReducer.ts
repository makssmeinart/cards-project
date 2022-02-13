import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {cardsApi} from "../../../m3-dal/api";




export type CardsType = {
    answer: string,
    answerImg: string,
    answerVideo: string,
    cardsPack_id: string,
    comments: string,
    created: string,
    grade: number,
    more_id: string,
    question: string,
    questionImg: string,
    questionVideo: string,
    rating: number,
    shots: number,
    type: string,
    updated: string,
    user_id: string,
    __v: number,
    _id: string,
}
const initState: InitStateType = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    packUserId: "",
    page: 0,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0
};


export const cardsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/CARD":
            return {...state, ...action.data}
        default:
            return state;
    }
};

// Action Creators
export const cardsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/CARD", data} as const;
};

// Thunk
export const fetchCardsTC = (packId: string) => (dispatch: Dispatch, getState: () => RootAppStateType) => {
    const state = getState().cards

    cardsApi.getCards("","", packId, 0, 0,"", 1, 10)
        .then(res=> {
            dispatch(cardsReducerAC(res.data))
            const st = getState().cards
            console.log("getCards", st)
        })
};

// Types
export type InitStateType = {
    cards: CardsType[],
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    packUserId: string,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number
};
type ActionTypes =
    | ReturnType <typeof cardsReducerAC>;
