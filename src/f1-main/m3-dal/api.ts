import axios from "axios";
import {RecoverPasswordFormValues} from "../../f2-pages/auth/recoverPassword/RecoverPassword";

// Axios Instance
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authApi = {
    recoverPassword: (values: RecoverPasswordFormValues) => {
        return axios.post<any>("auth/forgot", {
                email: values.email,
                from: `test-front-admin <${values.email}>`,
                message: `<div > password recovery link: 
                            <a href='http://localhost:3000/cards-project#/new-password/$token$'>link</a></div>`
            },
            {
                baseURL: "https://neko-back.herokuapp.com/2.0",
                withCredentials: true,
            })
    }
}

// Types
type CommonRecoveryResponse = {
    info: string
    error?: string
}

type AuthForgotResponse = {
    email: string
    from: string
    message: string
}