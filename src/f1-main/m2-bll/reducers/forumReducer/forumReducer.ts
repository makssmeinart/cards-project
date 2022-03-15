import { Dispatch } from "redux";
import { forumApi } from "../../../m3-dal/api";

const initState: Array<InitialStateType> = [];

export const forumReducer = (
  state = initState,
  action: ActionTypes
): Array<InitialStateType> => {
  switch (action.type) {
    case "FORUM/SET_ALL_FORUMS":
      return  [...action.data ];
    default:
      return state;
  }
};

// Action Creators
const setAllForums = (data: InitialStateType[]) => {
  return {
    type: "FORUM/SET_ALL_FORUMS",
    data,
  } as const;
};

// Thunk

export const getAllForumsTC = () => (dispatch: Dispatch) => {
  forumApi.getAllForums().then((res) => {
    console.log(res);
    dispatch(setAllForums(res.data))
  });
};

// Types
export type InitialStateType = {
  _id: string;
  createDate: string;
  isAdmin: string;
  name: string;
};

type ActionTypes = ReturnType<typeof setAllForums>;
