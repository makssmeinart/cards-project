import { Dispatch } from "react";
import { authApi } from "../../../m3-dal/api";
import { RecoverPasswordFormValues } from "../../../../f2-pages/auth/recoverPassword/RecoverPassword";
import {
  changeInitializedType,
  changeStatus,
  changeStatusACTypes,
  errorMessageACTypes,
} from "../appReducer/appReducer";
import { serverErrorHandling } from "../../../m4-utility/serverErrorHandling";

const initState: InitStateTypes = {};

export const recoverPasswordReducer = (
  state = initState,
  action: ActionTypes
): InitStateTypes => {
  switch (action.type) {
    default:
      return state;
  }
};

export const recoverPassword =
  (
    values: RecoverPasswordFormValues,
    setEmailChecked: (emailChecked: boolean) => void
  ) =>
  (dispatch: Dispatch<ActionTypes>) => {
    dispatch(changeStatus("loading"));

    return authApi
      .recoverPassword(values)
      .then((res) => {
        dispatch(changeStatus("completed"));
        setEmailChecked(false);
      })
      .catch((err) => {
        serverErrorHandling(err, dispatch);
      });
  };

// Types

type ActionTypes =
  | errorMessageACTypes
  | changeInitializedType
  | changeStatusACTypes;

type InitStateTypes = any;
