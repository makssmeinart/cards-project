import { Dispatch } from "redux";
import { RootAppStateType } from "../../store";
import {
  AddCardPayload,
  cardsApi,
  EditCardsPayload,
  GetCardsPayload,
  GradeCardPayload,
} from "../../../m3-dal/api";
import { ThunkDispatch } from "redux-thunk";
import {
  changeInitialized,
  changeStatus,
  changeStatusACTypes,
} from "../appReducer/appReducer";
import { serverErrorHandling } from "../../../m4-utility/serverErrorHandling";

export type CardsType = {
  answer: string;
  answerImg: string;
  answerVideo: string;
  cardsPack_id: string;
  comments: string;
  created: string;
  grade: number;
  more_id: string;
  question: string;
  questionImg: string;
  questionVideo: string;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  __v: number;
  _id: string;
};
const initState: InitStateType = {
  cards: [],
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  packUserId: "",
  page: 1,
  pageCount: 10,
  token: "",
  tokenDeathTime: 0,
  sortCardsValue: "",
  searchByCardsQuestion: "",
};

export const cardsReducer = (
  state = initState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    case "CARDS/CARD":
      return { ...state, ...action.data };
    case "CARDS/CHANGE-CARDS-VALUE": {
      return { ...state, sortCardsValue: action.value };
    }
    case "CARDS/CHANGE-SEARCH-BY-CARDS-QUESTION-VALUE": {
      return { ...state, searchByCardsQuestion: action.value };
    }
    case "CARDS/CARDS/CHANGE-PAGINATION-VALUE": {
      return { ...state, page: action.page, pageCount: action.pageSize };
    }
    default:
      return state;
  }
};

// Action Creators
export const cardsReducerAC = (data: InitStateType) => {
  return { type: "CARDS/CARD", data } as const;
};
export const changeCardsValueAC = (value: string) => {
  return { type: "CARDS/CHANGE-CARDS-VALUE", value } as const;
};
export const changeSearchByCardsQuestionValue = (value: string) => {
  return {
    type: "CARDS/CHANGE-SEARCH-BY-CARDS-QUESTION-VALUE",
    value,
  } as const;
};
export const changePaginationValueCard = (page: number, pageSize: number) => {
  return {
    type: "CARDS/CARDS/CHANGE-PAGINATION-VALUE",
    page,
    pageSize,
  } as const;
};

// Thunk
export const fetchCardsTC =
  (packId: string) =>
  (dispatch: Dispatch, getState: () => RootAppStateType) => {
    const state = getState().cards;
    const { sortCardsValue, searchByCardsQuestion, page, pageCount } = state;
    const payload: GetCardsPayload = {
      cardAnswer: "",
      cardQuestion: searchByCardsQuestion,
      cardsPack_id: packId,
      min: 0,
      max: 0,
      sortCards: sortCardsValue,
      page,
      pageCount: pageCount === 1000 ? 10 : pageCount,
    };

    cardsApi
      .getCards(payload)
      .then((res) => {
        dispatch(cardsReducerAC(res.data));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

export const fetchAllCardsTC = (packId: string) => (dispatch: Dispatch) => {
  const payload: GetCardsPayload = {
    cardAnswer: "",
    cardQuestion: "",
    cardsPack_id: packId,
    min: 0,
    max: 0,
    sortCards: "",
    page: 1,
    pageCount: 1000,
  };

  dispatch(changeStatus("loading"));

  cardsApi
    .getCards(payload)
    .then((res) => {
      dispatch(cardsReducerAC(res.data));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    })
    .finally(() => {
      dispatch(changeStatus("idle"));
    });
};

export const addCardTC =
  (packId: string, question: string, answer: string) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, ActionTypes>) => {
    const payload: AddCardPayload = {
      cardsPack_id: packId,
      question,
      answer,
      grade: 0,
      shots: 0,
      answerImg: "",
      questionImg: "",
      questionVideo: "",
    };

    cardsApi
      .addCard(payload)
      .then(() => {
        dispatch(fetchCardsTC(packId));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };
export const editCardTC =
  (idCard: string, question: string, answer: string, packId: string) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, ActionTypes>) => {
    const payload: EditCardsPayload = {
      _id: idCard,
      question,
      answer,
    };

    cardsApi
      .editCard(payload)
      .then(() => {
        dispatch(fetchCardsTC(packId));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };
export const deleteCardTC =
  (packId: string, cardId: string) =>
  (dispatch: ThunkDispatch<RootAppStateType, void, ActionTypes>) => {
    const payload: string = cardId;

    cardsApi
      .deleteCard(payload)
      .then(() => {
        dispatch(fetchCardsTC(packId));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

export const gradeCardTC =
  (grade: number, cardId: string) => (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));

    const payload: GradeCardPayload = {
      grade,
      card_id: cardId,
    };

    cardsApi
      .gradeCard(payload)
      .then(() => {
        dispatch(changeStatus("completed"));
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types
export type InitStateType = {
  cards: CardsType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
  sortCardsValue: string;
  searchByCardsQuestion: string;
};
type ActionTypes =
  | ReturnType<typeof cardsReducerAC>
  | ReturnType<typeof changeCardsValueAC>
  | ReturnType<typeof changeSearchByCardsQuestionValue>
  | changeStatusACTypes
  | ReturnType<typeof changePaginationValueCard>;
