import axios, {AxiosResponse} from "axios";
import {RecoverPasswordFormValues} from "../../f2-pages/auth/recoverPassword/RecoverPassword";
import {InitStateType} from "../m2-bll/reducers/login/loginReducer";

// Axios Instance
const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    withCredentials: true,
});

export const authApi = {
    recoverPassword: (values: RecoverPasswordFormValues) => {
        return axios.post<AuthForgotDataType,
            AxiosResponse<AuthForgotResponseType>>(
            "auth/forgot",
            {
                email: values.email,
                from: `test-front-admin <${values.email}>`,
                message: `<div > password recovery link: 
                            <a href='http://localhost:3000/cards-project#/new-password/$token$'>link</a></div>`,
            },
            {
                baseURL: "https://neko-back.herokuapp.com/2.0",
                withCredentials: true,
            }
        );
    },
    login(data: LoginParamsType) {
        return instance.post<InitStateType>("/auth/login", data);
    },
    logout: () => {
        return instance.delete<Pick<CommonRecoveryResponse, "info">>("/auth/me");
    },
    authMe() {
        return instance.post<InitStateType>("/auth/me", {});
    },
    register(data: RegisterDataType) {
        return instance.post<any>("/auth/register", data);
    },
    setNewPassword(newPass: string, resToken: string) {
        return instance.post<any>("/auth/set-new-password", {password: newPass, resetPasswordToken: resToken})
    }
};
export const packsApi = {}
export const cardsApi = {}

// Types
type CommonRecoveryResponse = {
    info: string;
    error?: string;
};
type AuthForgotDataType = {
    email: string;
    from: string;
    message: string;
};
type AuthForgotResponseType = {
    answer: boolean;
    html: boolean;
    info: string;
    success: boolean;
};
export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
};
export type RegisterDataType = {
    email: string;
    password: string;
}
