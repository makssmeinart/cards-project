import { Dispatch } from "redux";
import { authApi } from "../../../m3-dal/api";
import { RootAppStateType } from "../../store";
import { LoginAC } from "../login/loginReducer";

const initState: InitStateTypes = {
  isLoggedIn: false,
  errorMessage: null,
  authMe: false,
  status: "idle",
};

export const appReducer = (
  state = initState,
  action: ActionTypes
): InitStateTypes => {
  switch (action.type) {
    case "AUTH/LOGIN/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    case "APP/ERROR/MESSAGE":
      return { ...state, errorMessage: action.value };
    case "APP/AUTH/ME":
      return { ...state, authMe: action.value };
    case "APP/STATUS/CHANGE-STATUS":
      return {...state, status: action.value}
    default:
      return state;
  }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({ type: "AUTH/LOGIN/SET-IS-LOGGED-IN", value } as const);

export const errorMessageAC = (value: string | null) =>
    ({type: "APP/ERROR/MESSAGE", value} as const);

export const changeStatus = (value: PendingStatusType) =>
    ({type: "APP/STATUS/CHANGE-STATUS", value} as const)

export const authMeAC = (value: boolean) => {
  return {
    type: "APP/AUTH/ME",
    value,
  } as const;
};

// Thunk

export const authMeTC = () => (dispatch: Dispatch, getState: () => RootAppStateType) => {
  authApi
      .authMe()
      .then((res) => {
        console.log("authMe()", res.data);
        dispatch(LoginAC(res.data))
        dispatch(setIsLoggedInAC(true));
        dispatch(authMeAC(true));
        const state = getState();
        const token = state.login;
        console.log("getState", token);
      })
};

// Types
type ActionTypes =
    |setIsLoggedInACTypes
    | errorMessageACTypes
    | ReturnType<typeof changeStatus>
    | authMeACTypes;
type setIsLoggedInACTypes = ReturnType<typeof setIsLoggedInAC>;
type errorMessageACTypes = ReturnType<typeof errorMessageAC>;
type authMeACTypes = ReturnType<typeof authMeAC>;
export type PendingStatusType = "idle" | "failed" | "completed" | "loading"
type InitStateTypes = {
  isLoggedIn: boolean;
  errorMessage: string | null;
  status: PendingStatusType
  authMe: boolean;
};
