import axios, {AxiosResponse} from "axios";
import {RecoverPasswordFormValues} from "../../f2-pages/auth/recoverPassword/RecoverPassword";
import { InitStateType } from "../m2-bll/reducers/login/loginReducer";

// Axios Instance
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authApi = {
    // hello
    recoverPassword: (values: RecoverPasswordFormValues) => {
        return axios.post<AuthForgotDataType, AxiosResponse<AuthForgotResponseType>>("auth/forgot", {
                email: values.email,
                from: `test-front-admin <${values.email}>`,
                message: `<div > password recovery link: 
                            <a href='http://localhost:3000/cards-project#/new-password/$token$'>link</a></div>`
            },
            {
                baseURL: "https://neko-back.herokuapp.com/2.0",
                withCredentials: true,
            })
    },
    login(data: LoginParamsType) {
        return instance.post<InitStateType>("/auth/login", data);
    },
    logout: () => {
        return instance.delete<Pick<CommonRecoveryResponse, "info">>("/auth/me")
    } ,
    authMe(){
        return instance.post<InitStateType>("/auth/me", {})
    }
}

// Types
type CommonRecoveryResponse = {
    info: string
    error?: string
}

type AuthForgotDataType = {
    email: string
    from: string
    message: string
}
type AuthForgotResponseType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
}