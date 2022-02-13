import {RootAppStateType} from "../store";
import {cardPacksType} from "../reducers/packsReducer/packsReducer";


export const appStatusSelector = (state: RootAppStateType) => state.app.status;
export const packNameSelector = (state:RootAppStateType) => state.packs.packName;
export const packSelector = (state:RootAppStateType):cardPacksType[]  => state.packs.cardPacks
export const isLoggedInSelector = (state:RootAppStateType)  => state.app.isLoggedIn
export const minRangeSelector = (state:RootAppStateType)  => state.packs.minCardsCount
export const maxRangeSelector = (state:RootAppStateType)  => state.packs.maxCardsCount
export const maxSelector = (state:RootAppStateType)  => state.packs.max
export const minSelector = (state:RootAppStateType)  => state.packs.min
export const sortedPackValueSelector = (state:RootAppStateType) => state.packs.sortedPackBtn
export const userIdSelector = (state: RootAppStateType) => state.login._id
export const currentPackIdSelector = (state: RootAppStateType) => state.packs.id