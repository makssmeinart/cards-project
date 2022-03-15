import { Dispatch } from "redux";
import { messageApi } from "../../../m3-dal/api";

const initState: Array<InitialStateType> = [];

export const forumMessageReducer = (
  state = initState,
  action: ActionTypes
): Array<InitialStateType> => {
  switch (action.type) {
    case "FORUM/MESSAGE/SET_ALL_MESSAGES_BY_ID":
      return [...action.data]
    default:
      return state;
  }
};

// Action Creators
const setAllMessagesByIdAC = (data: InitialStateType[]) => {
  return {
    type: "FORUM/MESSAGE/SET_ALL_MESSAGES_BY_ID",
    data,
  } as const;
};

// Thunk
export const getAllMessagesByIdTC =
  (forumId: string) => (dispatch: Dispatch) => {
    messageApi.getAllMessagesById(forumId).then((res) => {
      console.log(res)
      dispatch(setAllMessagesByIdAC(res.data))
    });
  };

// Types

export type InitialStateType = {
  _id: string;
  createDate: string;
  message: string;
  forumId: string;
  userName: string;
};

type ActionTypes = ReturnType<typeof setAllMessagesByIdAC>;
