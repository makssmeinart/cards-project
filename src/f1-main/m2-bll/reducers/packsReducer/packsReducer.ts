import {Dispatch} from "redux";
import {RootAppStateType} from "../../store";
import {packsApi} from "../../../m3-dal/api";
import {ThunkDispatch} from "redux-thunk";
import {changeStatus} from "../appReducer/appReducer";

const img =
    "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/" +
    "37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=fo" +
    "rmat&fit=crop&s=d456a2af571d980d8b2985472c262b31";

const initState: InitStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 103,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    token: "",
    tokenDeathTime: 0,
    //sort input
    packName: "",
    //sort btn
    sortedPackBtn: false,
    //range
    min: 0,
    max: 10,
    // currentPackId
    id: "",
    // currentPackName
    name: "",
    // sortPackValue
    sortedPackValue: "",
};

export const packsReducer = (
    state = initState,
    action: ActionTypes
): InitStateType => {
    switch (action.type) {
        case "CARDS/PACKS":
            return {...state, ...action.data};
        case "CARDS/PACKS/INPUT":
            return {...state, packName: action.value};
        case "CARDS/PACKS/BTN-SORTED":
            return {...state, sortedPackBtn: action.value};
        case "CARDS/PACKS/RANGE-VALUE":
            return {...state, min: action.min, max: action.max};
        case "CARDS/PACKS/DELETE":
            return {...state, id: action.idPack};
        case "CARDS/PACKS/GET-NAME":
            return {...state, name: action.name};
        case "CARDS/PACKS/SORTED-VALUE":
            return {...state, sortedPackValue: action.value};
        case "CARDS/PACKS/CHANGE-PAGINATION-VALUE": {
            return {...state, page: action.page, pageCount: action.pageSize}
        }
        default:
            return state;
    }
};

// Action Creators
export const packsReducerAC = (data: InitStateType) => {
    return {type: "CARDS/PACKS", data} as const;
};
export const inputChangeHandlerAC = (value: string) => {
    return {type: "CARDS/PACKS/INPUT", value} as const;
};
export const sortedPackBtnAC = (value: boolean) => {
    return {type: "CARDS/PACKS/BTN-SORTED", value} as const;
};
export const rangeValueAC = (min: number, max: number) => {
    return {type: "CARDS/PACKS/RANGE-VALUE", min, max} as const;
};
export const changePackIdAC = (idPack: string) => {
    return {type: "CARDS/PACKS/DELETE", idPack} as const;
};
export const changePackNameAC = (name: string) => {
    return {type: "CARDS/PACKS/GET-NAME", name} as const;
};
export const changeSortedPackValueAC = (value: string) => {
    return {type: "CARDS/PACKS/SORTED-VALUE", value} as const;
};
export const changePaginationValue = (page: number, pageSize: number) => {
    return {
        type: "CARDS/PACKS/CHANGE-PAGINATION-VALUE",
        page,
        pageSize
    } as const
}


// Thunk
export const fetchPacksTC =
    () => (dispatch: Dispatch, getState: () => RootAppStateType) => {
        dispatch(changeStatus("loading"))
        const state = getState().packs;
        const switcherBtn = getState().packs.sortedPackBtn;

        let user_id;
        if (!switcherBtn) {
            user_id = "";
        } else {
            user_id = getState().login._id;
        }

        const {packName, min, max, page, pageCount, sortedPackValue} = state;

        packsApi
            .getPacks(packName, min, max, sortedPackValue, page,
                pageCount, user_id)
            .then((res) => {
                dispatch(changeStatus("completed"))
                dispatch(packsReducerAC(res.data));
                const st = getState().packs;
                console.log("getPacks", st);
            });
    };
export const addPackTC =
    () =>
        (
            dispatch: ThunkDispatch<RootAppStateType, void, any>,
            getState: () => RootAppStateType
        ) => {
            dispatch(changeStatus("loading"))
            const state = getState().packs;

            const {packName} = state;

            packsApi.addPack(packName, img, false).then(() => {
                dispatch(changeStatus("completed"))
                dispatch(fetchPacksTC());
            });
        };
export const editPackTC = (idPack: string, packName: string) =>
    (dispatch: ThunkDispatch<RootAppStateType, void, any>,
     getState: () => RootAppStateType) => {
        dispatch(changeStatus("loading"))
        // ChangeID
        dispatch(changePackIdAC(idPack));
        dispatch(changePackNameAC(packName));

        const state = getState().packs;
        const {name, id} = state;

        packsApi.editPack(id, name).then(() => {
            dispatch(changeStatus("completed"))
            dispatch(fetchPacksTC());
        });
    };
export const deletePacksTC =
    (idPack: string) =>
        (
            dispatch: ThunkDispatch<RootAppStateType, any, any>,
            getState: () => RootAppStateType
        ) => {
            dispatch(changeStatus("loading"))
            dispatch(changePackIdAC(idPack));
            const state = getState().packs;
            const {id} = state;
            packsApi.deletePacks(id).then((res) => {
                dispatch(changeStatus("completed"))
                dispatch(fetchPacksTC());
            });
        };
// Types
export type InitStateType = {
    cardPacks: cardPacksType[];
    cardPacksTotalCount: number;
    maxCardsCount: number;
    minCardsCount: number;
    page: number;
    pageCount: number;
    token: string;
    tokenDeathTime: number;
    packName: string;
    sortedPackBtn: boolean;
    min: number;
    max: number;
    id: string;
    name: string;
    sortedPackValue: string;
};
export type cardPacksType = {
    cardsCount: number;
    created: string;
    deckCover: string;
    grade: number;
    more_id: string;
    name: string;
    path: string;
    private: false;
    rating: number;
    shots: number;
    type: string;
    updated: string;
    user_id: string;
    user_name: string;
    __v: number;
    _id: string;
};

type packsReducerACType = ReturnType<typeof packsReducerAC>;
type changeSortedPackValueACType = ReturnType<typeof changeSortedPackValueAC>;
type deletePackACType = ReturnType<typeof changePackIdAC>;
type rangeValueACType = ReturnType<typeof rangeValueAC>;
type inputChangeHandlerACType = ReturnType<typeof inputChangeHandlerAC>;
type getPackNameAC = ReturnType<typeof changePackNameAC>;
export type sortedPackBtnACType = ReturnType<typeof sortedPackBtnAC>;
type ActionTypes =
    | packsReducerACType
    | inputChangeHandlerACType
    | sortedPackBtnACType
    | rangeValueACType
    | deletePackACType
    | getPackNameAC
    | changeSortedPackValueACType
    | ReturnType<typeof changePaginationValue>