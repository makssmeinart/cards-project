import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./reducers/profile/profileReducer";
import {loginReducer} from "./reducers/login/loginReducer";
import {registerReducer} from "./reducers/register/registerReducer";
import {newPassword} from "./reducers/newPassword/newPassword";
import {recoverPassword} from "./reducers/recoverPassword/recoverPassword";
import thunk from "redux-thunk";

const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newPassword: newPassword,
    recoverPassword: recoverPassword,
    profile: profileReducer,
})

export const store = createStore(reducer, applyMiddleware(thunk))

// Types 

export type RootAppStateType = ReturnType<typeof reducer>