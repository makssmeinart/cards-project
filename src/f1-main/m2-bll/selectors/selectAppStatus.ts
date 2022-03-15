import { RootAppStateType } from "../store";
import { cardPacksType } from "../reducers/packsReducer/packsReducer";

// Packs

export const appStatusSelector = (state: RootAppStateType) => state.app.status;
export const packNameSelector = (state: RootAppStateType) =>
  state.packs.packName;
export const packSelector = (state: RootAppStateType): cardPacksType[] =>
  state.packs.cardPacks;
export const isLoggedInSelector = (state: RootAppStateType) =>
  state.app.isLoggedIn;
export const minRangeSelector = (state: RootAppStateType) =>
  state.packs.minCardsCount;
export const maxRangeSelector = (state: RootAppStateType) =>
  state.packs.maxCardsCount;
export const maxSelector = (state: RootAppStateType) => state.packs.max;
export const minSelector = (state: RootAppStateType) => state.packs.min;
export const sortedPackValueSelector = (state: RootAppStateType) =>
  state.packs.sortedPackBtn;
export const userIdSelector = (state: RootAppStateType) => state.login._id;
export const currentPackIdSelector = (state: RootAppStateType) =>
  state.packs.id;
export const sortByPacksSortValueSelector = (state: RootAppStateType) =>
  state.packs.sortedPackValue;

// Cards

export const getCardsSelector = (state: RootAppStateType) => state.cards.cards;
export const currentUserIdSelector = (state: RootAppStateType) =>
  state.cards.packUserId;
export const sortCardsValueSelector = (state: RootAppStateType) =>
  state.cards.sortCardsValue;
export const searchByCardsQuestionSelector = (state: RootAppStateType) =>
  state.cards.searchByCardsQuestion;
export const getEmailSelector = (state: RootAppStateType) => state.login.email

// Pagination

export const selectCurrentPage = (state: RootAppStateType) => state.packs.page;
export const selectTotalPacksCount = (state: RootAppStateType) =>
  state.packs.cardPacksTotalCount;
export const selectPageSize = (state: RootAppStateType) =>
  state.packs.pageCount

// Forum
export const selectAllForums = (state: RootAppStateType) =>
  state.forum
// Messages
export const selectAllMessages = (state: RootAppStateType) =>
    state.messageForum
