import { applyMiddleware, combineReducers, createStore } from "redux";
import { recoverPassword } from "./reducers/recoverPassword/recoverPassword";
import thunk from "redux-thunk";
import {
  appReducer,
  cardsReducer,
  loginReducer,
  newPasswordReducer,
  packsReducer,
  profileReducer,
  registerReducer,
} from "./reducers";

const reducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
  newPassword: newPasswordReducer,
  recoverPassword: recoverPassword,
  profile: profileReducer,
  app: appReducer,
  packs: packsReducer,
  cards: cardsReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

// Types

export type RootAppStateType = ReturnType<typeof reducer>;

//@ts-ignore
window.store = store;
