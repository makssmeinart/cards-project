import { authApi, LoginParamsType } from "../../../m3-dal/api";
import { Dispatch } from "redux";
import {errorMessageAC, setIsLoggedInAC} from "../appReducer/appReducer";

const initState: InitStateType = {
  created: "",
  email: "",
  isAdmin: false,
  name: "",
  publicCardPacksCount: 0,
  rememberMe: false,
  token: "",
  tokenDeathTime: 0,
  updated: "",
  verified: false,
  __v: 0,
  _id: "",
};

export const loginReducer = (
  state = initState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    case "AUTH/LOGIN":
      return { ...action.data };
    default:
      return state;
  }
};

export const LoginAC = (data: InitStateType) => {
  return { type: "AUTH/LOGIN", data } as const;
};


export const LoginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
  authApi
    .login(data)
    .then((res) => {
      if (res.status === 200) {
        dispatch(setIsLoggedInAC(true));
        dispatch(LoginAC(res.data));
        console.log(res.data);
      } else {}
    })
    .catch((e) => {
      const error = e.response? e.response.data.error: (e.message + ', more details in the console');
      console.log(error)
      dispatch(errorMessageAC(error));
    });
};

// Types
export type InitStateType = {
  created: string;
  email: string;
  isAdmin: boolean;
  name: string;
  publicCardPacksCount: number;
  rememberMe: boolean;
  token: string;
  tokenDeathTime: number;
  updated: string;
  verified: boolean;
  __v: number;
  _id: string;
};
type ActionTypes = LoginACTypes;
type LoginACTypes = ReturnType<typeof LoginAC>;