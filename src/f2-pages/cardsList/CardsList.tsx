import {Navigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCardsTC} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import tableS from "../../f1-main/m1-ui/components/common/table/table.module.css";
import {
    appStatusSelector,
    currentUserIdSelector,
    getCardsSelector,
    isLoggedInSelector,
    userIdSelector
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {TableItemCards} from "../../f1-main/m1-ui/components/common/table/tableItem/TableItemCards";

export const CardsList = () => {
    const status = useSelector(appStatusSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch()
    const cards = useSelector(getCardsSelector)
    const {packId} = useParams()
    const myId = useSelector(userIdSelector)
    const currentUserId = useSelector(currentUserIdSelector)

    useEffect(() => {
        packId && dispatch(fetchCardsTC(packId))
    }, [packId])

    if (!isLoggedIn) {
        return <Navigate to={routes.login}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section>
                    <Header/>
                    <main className={`${tableS.content} ${tableS.content_card}`}>
                        <div className={tableS.table}>
                            {currentUserId === myId &&
                            <SuperButton onClick={() => alert("Sosatj")}>Add new item</SuperButton>}

                            <ul className={`${tableS.tableItem} ${tableS.tableHeader}`}>
                                <li>Question</li>
                                <li>Answer</li>
                                <li>Last Updated</li>
                                <li>Grade</li>
                                <li>Actions</li>
                            </ul>
                            <div style={{backgroundColor: "orange"}}>
                                {cards.map((c) => {
                                    return <TableItemCards card={c} />
                                })}
                            </div>
                        </div>
                    </main>
                </section>
            )
            }
        </>
    )
}