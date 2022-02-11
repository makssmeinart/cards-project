import {authApi, LoginParamsType} from "../../../m3-dal/api";
import {Dispatch} from "redux";
import {changeStatus, setIsLoggedInAC} from "../appReducer/appReducer";
import {serverErrorHandling} from "../../../m4-utility/serverErrorHandling";


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

export const loginReducer = (state = initState, action: ActionTypes): InitStateType => {
    switch (action.type) {
        case "AUTH/LOGIN":
            return {...action.data};
        default:
            return state;
    }
};

// Action Creators
export const LoginAC = (data: InitStateType) => {
    return {type: "AUTH/LOGIN", data} as const;
};

// Thunk
export const LoginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    // Spinner
    dispatch(changeStatus("loading"));

    authApi
        .login(data)
        .then((res) => {
            if (res.status === 200) {
                dispatch(changeStatus("completed"));
                dispatch(setIsLoggedInAC(true));
                dispatch(LoginAC(res.data));
            } else {
            }
        })
        .catch((e) => {
            dispatch(changeStatus("failed"));
            serverErrorHandling(e, dispatch);
        })
        .finally(() => {
            dispatch(changeStatus("idle"));
        });
};
export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(changeStatus("loading"));

    const logoutData = {
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

    authApi
        .logout()
        .then(() => {
            dispatch(changeStatus("completed"));
            dispatch(setIsLoggedInAC(false));
            dispatch(LoginAC(logoutData));
        })
        .catch(() => {
            dispatch(changeStatus("failed"));
        })
        .finally(() => {
            dispatch(changeStatus("idle"));
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
