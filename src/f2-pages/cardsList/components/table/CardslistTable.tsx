import s
    from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React from "react";
import {CardslistTableHeader} from "./header/CardslistTableHeader";
import {TableItem} from "./tableItem/TableItem";
import {useSelector} from "react-redux";
import {getCardsSelector} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";

export const CardslistTable = () => {
    const cards = useSelector(getCardsSelector);

    return (
        <div className={s.tableContainer}>
            <CardslistTableHeader />
            {cards.map((c) => {
                return <TableItem key={c._id} card={c} />
            })}
        </div>
    )
}