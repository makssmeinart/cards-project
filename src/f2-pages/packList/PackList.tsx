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
    packSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {RootAppStateType} from "../../f1-main/m2-bll/store";
import packsS from "../../f1-main/m1-ui/components/common/table/packsListTable.module.css"

export const PackList = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [sortedPackBtn, setSortedPackBtn] = useState(true);

    const [nameSortValue, setNameSortValue] = useState<"0name" | "1name">("0name")
    const nameSortHandler = () => {
        if (nameSortValue === "1name") {
            setNameSortValue(()=>"0name")
        } else {
            setNameSortValue(()=>"1name")
        }
        dispatch(changeSortedPackValueAC(nameSortValue))
    }

    const [userIdValue, setUserIdValue] = useState<"0user_id" | "1user_id">("0user_id")
    const userIdSortHandler = () => {
        if (userIdValue === "1user_id") {
            setUserIdValue(()=>"0user_id")
        } else {
            setUserIdValue(()=>"1user_id")
        }
        dispatch(changeSortedPackValueAC(userIdValue))
    }

    const [cardsValue, setCardsValue] = useState<"0cardsCount" | "1cardsCount">("0cardsCount")
    const cardsSortHandler = () => {
        if (cardsValue === "1cardsCount") {
            setCardsValue(()=>"0cardsCount")
        } else {
            setCardsValue(()=>"1cardsCount")
        }
        dispatch(changeSortedPackValueAC(cardsValue))

    }

    const [lastUpdatedValue, setLastUpdatedValue] = useState<"0updated" | "1updated">("0updated")
    const lastUpdatedHandler = () => {
        if (lastUpdatedValue === "1updated") {
            setLastUpdatedValue(()=>"0updated")
        } else {
            setLastUpdatedValue(()=>"1updated")
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
    const sortValue = useSelector<RootAppStateType>(state => state.packs.sortedPackValue)

    const sendInput = () => {
        dispatch(inputChangeHandlerAC(inputValue));
    };
    const setMyPacks = () => {
        setSortedPackBtn(true);

        dispatch(sortedPackBtnAC(sortedPackBtn));
    };
    const setAllPacks = () => {
        setSortedPackBtn(false);

        dispatch(sortedPackBtnAC(sortedPackBtn));
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
    }, [packName, sortedPackBtn, min, max, currentPackId, sortValue]);

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
                            <aside>
                                <div>
                                    <h2>Show pack cards</h2>
                                    <div>
                                        <button>My</button>
                                        <button>All</button>
                                    </div>
                                </div>
                                <div>
                                    <h3>Show number of cards</h3>
                                    <div>
                                        <input type="text"/>
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
                                           tableItem
                                           <span>Pack Name</span>
                                           <span>5</span>
                                           <span>2010-5-12</span>
                                           <span>m.meinarts10@gmail.com</span>
                                           <span>
                                               <button>Delete</button>
                                               <button>Edit</button>
                                               <button>Learn</button>
                                           </span>
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