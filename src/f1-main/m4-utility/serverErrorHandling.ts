import { Dispatch } from "react";
import {
  changeStatus, changeStatusACTypes,
  errorMessageAC,
  errorMessageACTypes,
} from "../m2-bll/reducers/appReducer/appReducer";
import { AxiosError } from "axios";

export const serverErrorHandling = (error: AxiosError, dispatch: Dispatch<errorMessageACTypes | changeStatusACTypes>) => {
  const resultError = error.response
    ? error.response.data.error
    : error.message;

  dispatch(errorMessageAC(resultError));
  dispatch(changeStatus("failed"))
};
