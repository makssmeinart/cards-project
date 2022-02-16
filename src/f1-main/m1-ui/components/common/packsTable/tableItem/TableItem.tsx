import packsS from "../../table/packsListTable.module.css";
import {Link} from "react-router-dom";
import s from "../../table/cardsListTable.module.css";
import {SuperButton} from "../../superButton/SuperButton";
import React, {useCallback} from "react";
import {
    cardPacksType,
    deletePacksTC, editPackTC
} from "../../../../../m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {userIdSelector} from "../../../../../m2-bll/selectors/selectAppStatus";

export const TableItem = ({pack}: TableItemPropsType) => {

    const dispatch = useDispatch()
    const updateDate = pack.updated.slice(0, 10)
    const myId = useSelector(userIdSelector);

    const deletePackHandler = useCallback((idPack: string) => {
        dispatch(deletePacksTC(idPack));
    }, [dispatch])

    const editPackHandler = useCallback((idPack: string, packName: string) => {
        dispatch(editPackTC(idPack, packName));
    }, [dispatch])

    return (
        <div className={packsS.items}>
            <Link
                to={`/main/cards-list/${pack._id}`}
                className={packsS.item}
            >
                {pack.name}
            </Link>
            <div
                className={packsS.item}>{pack.cardsCount}</div>
            <div
                className={packsS.item}>{updateDate}</div>
            <div
                className={packsS.item}>{pack.user_name}</div>
            <div
                className={packsS.item}>
                <div
                    className={s.buttonHolder}>
                    {myId === pack.user_id && (
                        <>
                            <SuperButton
                                onClick={() => deletePackHandler(pack._id)}
                                className={"miniDeleteButton"}
                            >
                                Delete
                            </SuperButton>
                            <SuperButton
                                onClick={() =>
                                    editPackHandler(pack._id, "New packaritooo")
                                }
                                className={"miniCommonButton"}
                            >
                                Edit
                            </SuperButton>
                        </>
                    )}
                    <SuperButton
                        onClick={() => alert("Learning the lot")}
                        className={"miniCommonButton"}
                    >
                        Learn
                    </SuperButton>
                </div>
            </div>
        </div>
    )
}

// Types

type TableItemPropsType = {
    pack: cardPacksType
}