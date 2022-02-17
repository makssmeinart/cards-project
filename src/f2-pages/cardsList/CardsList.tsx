import {Navigate, useParams} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchCardsTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {
    appStatusSelector,
    isLoggedInSelector,
    searchByCardsQuestionSelector,
    sortCardsValueSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import s
    from "../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import {fetchPacksTC} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {CardslistHeader} from "./components/header/CardslistHeader";
import {CardslistSearch} from "./components/search/CardslistSearch";
import {CardslistTable} from "./components/table/CardslistTable";

export const CardsList = () => {
    const status = useSelector(appStatusSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch();
    const {packId} = useParams();
    const sortCardsValue = useSelector(sortCardsValueSelector);
    const searchByCardsQuestion = useSelector(searchByCardsQuestionSelector)

    useEffect(() => {
        dispatch(fetchPacksTC())
    }, [])

    useEffect(() => {
        packId && dispatch(fetchCardsTC(packId));
    }, [packId, sortCardsValue, searchByCardsQuestion]);

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
                    <main className={s.content}>
                        <div className={s.wrapper}>
                            <CardslistHeader/>
                            <CardslistSearch/>
                            <CardslistTable/>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
};
