import {Action, Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {cardsApi} from "../../../m3-dal/api";
import {ThunkDispatch} from "redux-thunk";

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
    tokenDeathTime: 0,
    sortCardsValue: "",
    searchByCardsQuestion: "",
};


export const cardsReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "CARDS/CARD":
            return {...state, ...action.data}
        case "CARDS/CHANGE-CARDS-VALUE": {
            return {...state, sortCardsValue: action.value}
        }
        case "CARDS/CHANGE-SEARCH-BY-CARDS-QUESTION-VALUE": {
            return {...state, searchByCardsQuestion: action.value}
        }
        default:
            return state;
    }
};

// Action Creators
export const cardsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/CARD", data} as const;
};
export const changeCardsValueAC = (value: string) => {
    return {type: "CARDS/CHANGE-CARDS-VALUE", value} as const
}
export const changeSearchByCardsQuestionValue = (value: string) => {
    return {type: "CARDS/CHANGE-SEARCH-BY-CARDS-QUESTION-VALUE", value} as const
}


// Thunk
export const fetchCardsTC = (packId: string) => (dispatch: Dispatch, getState: () => RootAppStateType) => {
    const state = getState().cards

    const {sortCardsValue, searchByCardsQuestion} = state

    cardsApi.getCards("", searchByCardsQuestion, packId, 0, 0, sortCardsValue, 1, 10)
        .then(res => {
            dispatch(cardsReducerAC(res.data))
            const st = getState().cards
            console.log("getCards", st)
        })
};
export const addCardTC = (packId: string) => (dispatch: ThunkDispatch<RootAppStateType, void, any>, getState: () => RootAppStateType) => {
    const grade = Math.floor(Math.random() * 5);
    cardsApi.addCard(packId, "123", "456", grade, 0, "", "", "").then(() => {
        dispatch(fetchCardsTC(packId));
    });
};
export const deleteCardTC = (packId: string, cardId: string) => (dispatch: ThunkDispatch<RootAppStateType, void, ActionTypes>) => {

    cardsApi.deleteCard(cardId).then(() => {
        dispatch(fetchCardsTC(packId))
    })
}


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
    sortCardsValue: string
    searchByCardsQuestion: string
};
type ActionTypes =
    | ReturnType<typeof cardsReducerAC>
    | ReturnType<typeof changeCardsValueAC>
    | ReturnType<typeof changeSearchByCardsQuestionValue>
