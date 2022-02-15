import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect, useState} from "react";
import {
    inputChangeHandlerAC,
    fetchPacksTC,
    sortedPackBtnAC,
    deletePacksTC, editPackTC, addPackTC, changeSortedPackValueAC
} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {
    appStatusSelector, currentPackIdSelector,
    isLoggedInSelector,
    maxRangeSelector,
    maxSelector,
    minRangeSelector,
    minSelector,
    packNameSelector,
    packSelector, sortByPacksSortValueSelector, sortedPackValueSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import packsS from "../../f1-main/m1-ui/components/common/table/packsListTable.module.css"
import {DoubleRange} from "../../f1-main/m1-ui/components/common/doubleRange/DoubleRange";

export const PackList = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [sortedPackBtn, setSortedPackBtn] = useState(false);

    const [nameSortValue, setNameSortValue] = useState<"0name" | "1name">("0name")
    const nameSortHandler = () => {
        if (nameSortValue === "1name") {
            setNameSortValue(() => "0name")
        } else {
            setNameSortValue(() => "1name")
        }
        dispatch(changeSortedPackValueAC(nameSortValue))
    }

    const [userIdValue, setUserIdValue] = useState<"0user_id" | "1user_id">("0user_id")
    const userIdSortHandler = () => {
        if (userIdValue === "1user_id") {
            setUserIdValue(() => "0user_id")
        } else {
            setUserIdValue(() => "1user_id")
        }
        dispatch(changeSortedPackValueAC(userIdValue))
    }

    const [cardsValue, setCardsValue] = useState<"0cardsCount" | "1cardsCount">("0cardsCount")
    const cardsSortHandler = () => {
        if (cardsValue === "1cardsCount") {
            setCardsValue(() => "0cardsCount")
        } else {
            setCardsValue(() => "1cardsCount")
        }
        dispatch(changeSortedPackValueAC(cardsValue))

    }

    const [lastUpdatedValue, setLastUpdatedValue] = useState<"0updated" | "1updated">("0updated")
    const lastUpdatedHandler = () => {
        if (lastUpdatedValue === "1updated") {
            setLastUpdatedValue(() => "0updated")
        } else {
            setLastUpdatedValue(() => "1updated")
        }
        dispatch(changeSortedPackValueAC(lastUpdatedValue))

    }

    const packName = useSelector(packNameSelector);
    const status = useSelector(appStatusSelector);
    const pack = useSelector(packSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const minRange = useSelector(minRangeSelector);
    const maxRange = useSelector(maxRangeSelector);
    const max = useSelector(maxSelector);
    const min = useSelector(minSelector);
    const currentPackId = useSelector(currentPackIdSelector);
    const sortValue = useSelector(sortByPacksSortValueSelector)
    const sortedPackValue = useSelector(sortedPackValueSelector)

    const sendInput = () => {
        dispatch(inputChangeHandlerAC(inputValue));
    };
    const setMyPacks = () => {
        setSortedPackBtn(true);
    };
    const setAllPacks = () => {
        setSortedPackBtn(false);
    };
    const addPackHandler = () => {
        dispatch(addPackTC())
    }
    const deletePackHandler = (idPack: string) => {
        dispatch(deletePacksTC(idPack))
    }
    const editPackHandler = (idPack: string, packName: string) => {
        dispatch(editPackTC(idPack, packName))
    }

    useEffect(() => {
        dispatch(fetchPacksTC());
    }, [packName, sortedPackValue, min, max, currentPackId, sortValue]);

    useEffect(() => {
         dispatch(sortedPackBtnAC(sortedPackBtn))
    }, [sortedPackBtn])

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
                            {/* Sidebar */}
                            <aside className={packsS.sidebar}>
                                <div className={packsS.showPacksCard}>
                                    <h2>Show pack cards</h2>
                                    <div className={packsS.buttonHolder}>
                                        <button onClick={setMyPacks}>My</button>
                                        <button onClick={setAllPacks}>All</button>
                                    </div>
                                </div>
                                <div className={packsS.showNumberOfCards}>
                                    <h3>Show number of cards</h3>
                                    <div>
                                        <DoubleRange min={minRange} max={maxRange}/>
                                    </div>
                                </div>
                            </aside>
                            <div>
                                {/* Content Header */}
                                <div>
                                    <h1>Title</h1>
                                </div>
                                <div>
                                    <input type="text"/>
                                    <button>Add new pack</button>
                                </div>
                                {/* Table */}
                                <div>
                                    table
                                    <div>
                                        tableHeader
                                        <span>Name</span>
                                        <span>Cards</span>
                                        <span>Last Updated</span>
                                        <span>Created By</span>
                                        <span>Actions</span>
                                    </div>
                                    <div>
                                        tableContent
                                        <div>
                                            {
                                                pack.map(p => {
                                                    return (
                                                        <li>
                                                            <span>{p.name}</span>
                                                            <span>{p.cardsCount}</span>
                                                            <span>{p.updated}</span>
                                                            <span>{p.user_name}</span>
                                                            <span><button>Delete</button>
                                                            <button>Edit</button>
                                                                <button>Learn</button>
                                                            </span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* Pagination */}
                                <div>
                                    Pagination
                                </div>
                            </div>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
};