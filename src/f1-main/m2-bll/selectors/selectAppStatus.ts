import {RootAppStateType} from "../store";
import {cardPacksType} from "../reducers/packsReducer/packsReducer";


export const appStatusSelector = (state: RootAppStateType) => state.app.status;
export const packNameSelector = (state:RootAppStateType) => state.packs.packName;
export const packSelector = (state:RootAppStateType):cardPacksType[]  => state.packs.cardPacks
export const isLoggedInSelector = (state:RootAppStateType)  => state.app.isLoggedIn
export const minRangeSelector = (state:RootAppStateType)  => state.packs.minCardsCount
export const maxRangeSelector = (state:RootAppStateType)  => state.packs.maxCardsCount