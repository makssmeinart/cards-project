import {Dispatch} from "redux";
import {authApi} from "../../../m3-dal/api";
import {LoginAC} from "../login/loginReducer";
import {serverErrorHandling} from "../../../m4-utility/serverErrorHandling";

const initState: InitStateTypes = {
    isLoggedIn: false,
    errorMessage: null,
    isInitialized: false,
    status: "idle",
};

export const appReducer = (
    state = initState,
    action: ActionTypes
): InitStateTypes => {
    switch (action.type) {
        case "AUTH/LOGIN/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value};
        case "APP/ERROR/MESSAGE":
            return {...state, errorMessage: action.value};
        case "APP/STATUS/CHANGE-STATUS":
            return {...state, status: action.value};
        case "APP/CHANGE-INITIALIZED":
            return {...state, isInitialized: action.value};
        default:
            return state;
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: "AUTH/LOGIN/SET-IS-LOGGED-IN", value} as const);

export const errorMessageAC = (value: string | null) =>
    ({type: "APP/ERROR/MESSAGE", value} as const);

export const changeStatus = (value: PendingStatusType) =>
    ({type: "APP/STATUS/CHANGE-STATUS", value} as const);


export const changeInitialized = (value: boolean) =>
    ({type: "APP/CHANGE-INITIALIZED", value} as const);

// Thunk

export const authMeTC =
    () => (dispatch: Dispatch) => {
        dispatch(changeStatus("loading"))

        authApi
            .authMe()
            .then((res) => {
                dispatch(changeStatus("completed"))
                dispatch(LoginAC(res.data));
                dispatch(setIsLoggedInAC(true));
            })
            .catch((err) => {
                serverErrorHandling(err, dispatch)
            })
            .finally(() => {
                dispatch(changeInitialized(true));
            });
    };

// Types
type ActionTypes =
    | setIsLoggedInACTypes
    | errorMessageACTypes
    | changeStatusACTypes
    | changeInitializedType;
type setIsLoggedInACTypes = ReturnType<typeof setIsLoggedInAC>;
export type changeStatusACTypes = ReturnType<typeof changeStatus>;
export type errorMessageACTypes = ReturnType<typeof errorMessageAC>;
export type changeInitializedType = ReturnType<typeof changeInitialized>;
export type PendingStatusType = "idle" | "failed" | "completed" | "loading";
type InitStateTypes = {
    isLoggedIn: boolean;
    errorMessage: string | null;
    status: PendingStatusType;
    isInitialized: boolean;
};
