import {RootAppStateType} from "../store";

export const selectAppStatus = (state: RootAppStateType): any => state.app.status;
