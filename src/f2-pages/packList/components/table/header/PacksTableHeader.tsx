import packsS from "../../../../../f1-main/m1-ui/components/common/table/packsListTable.module.css";
import s from "../../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React, {useCallback, useState} from "react";
import {changeSortedPackValueAC} from "../../../../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch} from "react-redux";

export const PacksTableHeader = () => {
    const dispatch = useDispatch()

    const [nameSortValue, setNameSortValue] = useState<"0name" | "1name">("0name");
    const [userIdValue, setUserIdValue] = useState<"0user_id" | "1user_id">("0user_id");
    const [cardsValue, setCardsValue] = useState<"0cardsCount" | "1cardsCount">("0cardsCount");
    const [lastUpdatedValue, setLastUpdatedValue] = useState<"0updated" | "1updated">("0updated");

    const nameSortHandler = useCallback(() => {
        if (nameSortValue === "1name") {
            setNameSortValue(() => "0name");
        } else {
            setNameSortValue(() => "1name");
        }
        dispatch(changeSortedPackValueAC(nameSortValue));
    }, [dispatch, nameSortValue])
    const userIdSortHandler = useCallback(() => {
        if (userIdValue === "1user_id") {
            setUserIdValue(() => "0user_id");
        } else {
            setUserIdValue(() => "1user_id");
        }
        dispatch(changeSortedPackValueAC(userIdValue));
    }, [dispatch, userIdValue])
    const cardsSortHandler = useCallback(() => {
        if (cardsValue === "1cardsCount") {
            setCardsValue(() => "0cardsCount");
        } else {
            setCardsValue(() => "1cardsCount");
        }
        dispatch(changeSortedPackValueAC(cardsValue));
    }, [dispatch, cardsValue])
    const lastUpdatedHandler = useCallback(() => {
        if (lastUpdatedValue === "1updated") {
            setLastUpdatedValue(() => "0updated");
        } else {
            setLastUpdatedValue(() => "1updated");
        }
        dispatch(changeSortedPackValueAC(lastUpdatedValue));
    }, [dispatch, lastUpdatedValue])

    return (
        <div
            className={packsS.tableHeaderWrapper}>
            <div className={packsS.tableHeader}>
                <div onClick={nameSortHandler}
                     className={s.tableLine}>
                    Name
                </div>
                <div onClick={cardsSortHandler}
                     className={s.tableLine}>
                    Cards
                </div>
                <div
                    onClick={lastUpdatedHandler}
                    className={s.tableLine}
                >
                    Last Updated
                </div>
                <div
                    onClick={userIdSortHandler}
                    className={s.tableLine}
                >
                    Created By
                </div>
                <div
                    className={s.tableLine}>Actions
                </div>
            </div>
        </div>
    )
}