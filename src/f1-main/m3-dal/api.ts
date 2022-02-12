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
            "/auth/forgot",
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
export const packsApi = {
    getPacks: (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id?: string) => {
        return instance.get("/cards/pack", {
            params: {
                packName, min, max, sortPacks, page, pageCount, user_id
            }
        })
    },
    addPack: (name?: string, deckCover?: string, statusPrivate?: boolean) => {
        return instance.post("/cards/pack", {
            cardsPack: {
                name,
                path: "/def",
                grade: 0,
                shots: 0,
                rating: 0,
                deckCover,
                private: statusPrivate,
                type: "pack",
            }
        })
    }
}
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
