import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect} from "react";
import {
    fetchPacksTC,
} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {
    appStatusSelector,
    currentPackIdSelector,
    isLoggedInSelector,
    maxRangeSelector,
    maxSelector,
    minRangeSelector,
    minSelector,
    packNameSelector,
    sortByPacksSortValueSelector,
    sortedPackValueSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import packsS
    from "../../f1-main/m1-ui/components/common/table/packsListTable.module.css";
import s
    from "../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";

import {Sidebar} from "../../f1-main/m1-ui/components/common/sidebar/Sidebar";
import {PacksSearch} from "../../f1-main/m1-ui/components/common/packsSearch/PacksSearch";
import {PacksTable} from "../../f1-main/m1-ui/components/common/packsTable/PacksTable";

export const PackList = React.memo(() => {
    const dispatch = useDispatch();

    const packName = useSelector(packNameSelector);
    const status = useSelector(appStatusSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const minRange = useSelector(minRangeSelector);
    const maxRange = useSelector(maxRangeSelector);

    const max = useSelector(maxSelector);
    const min = useSelector(minSelector);

    const currentPackId = useSelector(currentPackIdSelector);
    const sortValue = useSelector(sortByPacksSortValueSelector);
    const sortedPackValue = useSelector(sortedPackValueSelector);

    useEffect(() => {
        dispatch(fetchPacksTC());
    }, [
        packName,
        sortedPackValue,
        min,
        max,
        currentPackId,
        sortValue,
        maxRange,
        minRange,
    ]);

    if (!isLoggedIn) {
        return <Navigate to={routes.login}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section style={{height: "100vh"}}>
                    <Header/>
                    <main className={packsS.main}>
                        <div className={packsS.wrapper}>
                            <Sidebar
                                minRange={minRange}
                                maxRange={maxRange}
                            />
                            <div>
                                <div className={packsS.content}>
                                    <div className={s.nameAndBack}>
                                        <h1>Pack Lists</h1>
                                    </div>
                                    <PacksSearch/>
                                    <PacksTable/>
                                    <div className={s.pagination}>PAGINATION
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
})