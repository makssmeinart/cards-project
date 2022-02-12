import {applyMiddleware, combineReducers, createStore} from "redux";
import {profileReducer} from "./reducers/profile/profileReducer";
import {loginReducer} from "./reducers/login/loginReducer";
import {registerReducer} from "./reducers/register/registerReducer";
import {newPasswordReducer} from "./reducers/newPassword/newPasswordReducer";
import {recoverPassword} from "./reducers/recoverPassword/recoverPassword";
import thunk from "redux-thunk";
import {appReducer} from "./reducers/appReducer/appReducer";
import {packsReducer} from "./reducers/packsReducer/packsReducer";
import {cardsReducer} from "./reducers/cardsReducer/cardsReducer";


const reducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoverPassword,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = createStore(reducer, applyMiddleware(thunk))

// Types 

export type RootAppStateType = ReturnType<typeof reducer>

//@ts-ignore
window.store = store