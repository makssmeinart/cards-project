const initState: InitStateTypes = {
    isLoggedIn: false,
    errorMessage: null,
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
            return {...state, errorMessage: action.value}
        case "APP/STATUS/CHANGE-STATUS":
            return {...state, status: action.value}
        default:
            return state;
    }
};

export const setIsLoggedInAC = (value: boolean) =>
    ({type: "AUTH/LOGIN/SET-IS-LOGGED-IN", value} as const);

export const errorMessageAC = (value: string | null) =>
    ({type: "APP/ERROR/MESSAGE", value} as const);

export const changeStatus = (value: PendingStatusType) =>
    ({type: "APP/STATUS/CHANGE-STATUS", value} as const)

// Types
type ActionTypes =
    |setIsLoggedInACTypes
    | errorMessageACTypes
    | ReturnType<typeof changeStatus>
type setIsLoggedInACTypes = ReturnType<typeof setIsLoggedInAC>;
type errorMessageACTypes = ReturnType<typeof errorMessageAC>;
export type PendingStatusType = "idle" | "failed" | "completed" | "loading"
type InitStateTypes = {
    isLoggedIn: boolean;
    errorMessage: string | null;
    status: PendingStatusType
};
