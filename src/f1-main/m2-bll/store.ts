import {combineReducers, createStore} from "redux";
import {authReducer} from "./reducers/auth/auth-reducer";
import {profileReducer} from "./reducers/profile/profile";

const reducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
})

export const store = createStore(reducer)

// Types 

export type RootAppStateType = ReturnType<typeof reducer>