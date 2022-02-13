import tableS from "../table.module.css"
import {cardPacksType} from "../../../../../m2-bll/reducers/packsReducer/packsReducer";
import {Link, NavLink} from "react-router-dom";
import {routes} from "../../../../../m2-bll/routes/routes";
import {SuperButton} from "../../superButton/SuperButton";
import React from "react";
import {useSelector} from "react-redux";
import {userIdSelector} from "../../../../../m2-bll/selectors/selectAppStatus";

export const TableItem = ({pack, deletePack, editPack}: TableItemType) => {
    const userId = useSelector(userIdSelector)
    const updated = pack.updated.slice(0,10)

    return (
        <div className={tableS.tableItem} key={pack._id}>
            <NavLink to={`/main/cards-list/${pack._id}`}>
                {pack.name}
            </NavLink>
            <div>
                {pack.cardsCount}
            </div>
            <div>
                {updated}
            </div>
            <div>
                {pack.user_name}
            </div>
            <div>
                {userId === pack.user_id ? (
                    <>
                        <SuperButton
                            onClick={() => deletePack(pack._id)}>Delete</SuperButton>
                        <SuperButton
                            onClick={() => editPack(pack._id, "New name test")}>Edit</SuperButton>
                    </>
                ) : null}
                <SuperButton>Learn</SuperButton>
            </div>

        </div>
    );
}

// Types

type TableItemType = {
    pack: cardPacksType
    deletePack: (idPack: string) => void
    editPack: (idPack: string, name: string) => void
}