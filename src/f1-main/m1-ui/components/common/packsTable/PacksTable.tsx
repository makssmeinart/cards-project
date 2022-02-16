import s from "../table/cardsListTable.module.css";
import React from "react";
import {PacksTableHeader} from "./header/PacksTableHeader";
import {useSelector} from "react-redux";
import {
    packSelector,
} from "../../../../m2-bll/selectors/selectAppStatus";
import {TableItem} from "./tableItem/TableItem";

export const PacksTable = React.memo(() => {

    const pack = useSelector(packSelector);

    return (
        <div className={s.tableContainer}>
            <PacksTableHeader />
            {pack.map((p) => {
                return <TableItem pack={p} />
            })}
        </div>
    )
})