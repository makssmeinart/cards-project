import s from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React from "react";
import {PacksTableHeader} from "./header/PacksTableHeader";
import {useSelector} from "react-redux";
import {
    packSelector,
} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import {TableItem} from "./tableItem/TableItem";

export const PacksTable = React.memo(() => {

    const pack = useSelector(packSelector);

    return (
        <div className={s.tableContainer}>
            <PacksTableHeader />
            {pack.map((p) => {
                return <TableItem key={p._id} pack={p} />
            })}
        </div>
    )
})