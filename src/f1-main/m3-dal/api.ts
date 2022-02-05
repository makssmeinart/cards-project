import axios from "axios";
import { InitStateType } from "../m2-bll/reducers/login/loginReducer";

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const instance = axios.create({
  baseURL: "http://localhost:7542/2.0",
});

export const api = {
  login(data: LoginParamsType) {
    return instance.post<InitStateType>("/auth/login", data);
  },
};
