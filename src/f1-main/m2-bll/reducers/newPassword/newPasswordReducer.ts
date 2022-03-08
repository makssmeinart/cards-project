import { Dispatch } from "redux";
import { authApi } from "../../../m3-dal/api";
import { serverErrorHandling } from "../../../m4-utility/serverErrorHandling";
import { changeStatus } from "../appReducer/appReducer";

const initState: InitStateTypes = {
  newPassword: "",
  token: "",
};

export const newPasswordReducer = (
  state = initState,
  action: ActionTypes
): InitStateTypes => {
  switch (action.type) {
    case "APP/SET-NEW-PASSWORD":
      return { newPassword: action.newPass, token: action.token };
    default:
      return state;
  }
};

export const setNewPasswordAC = (newPass: string, token: string) => {
  return {
    type: "APP/SET-NEW-PASSWORD",
    newPass,
    token,
  } as const;
};

export const setNewPasswordTC =
  (newPassword: string, token: string, setNav: (nav: boolean) => void) =>
  (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));
    authApi
      .setNewPassword(newPassword, token)
      .then(() => {
        dispatch(setNewPasswordAC(newPassword, token));
        dispatch(changeStatus("completed"));
        setNav(true);
      })
      .catch((e) => {
        serverErrorHandling(e, dispatch);
      });
  };

// Types

type ActionTypes = setNewPasswordACType;
type setNewPasswordACType = ReturnType<typeof setNewPasswordAC>;
type InitStateTypes = {
  newPassword: string;
  token: string;
};
