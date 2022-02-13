import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect, useState} from "react";
import {
    inputChangeHandlerAC,
    fetchPacksTC,
    sortedPackBtnAC,
    deletePacksTC, editPackTC, addPackTC
} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {SuperInputText} from "../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {
    appStatusSelector, currentPackIdSelector,
    isLoggedInSelector,
    maxRangeSelector,
    maxSelector,
    minRangeSelector,
    minSelector,
    packNameSelector,
    packSelector,
    userIdSelector
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {DoubleRange} from "../../f1-main/m1-ui/components/common/doubleRange/DoubleRange";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import tableS from "../../f1-main/m1-ui/components/common/table/table.module.css"
import {TableItem} from "../../f1-main/m1-ui/components/common/table/tableItem/TableItem";

export const PackList = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [sortedPackBtn, setSortedPackBtn] = useState(true);
    const packName = useSelector(packNameSelector);
    const status = useSelector(appStatusSelector);
    const pack = useSelector(packSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const minRange = useSelector(minRangeSelector);
    const maxRange = useSelector(maxRangeSelector);
    const max = useSelector(maxSelector);
    const min = useSelector(minSelector);
    const currentPackId = useSelector(currentPackIdSelector)

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
    }, [packName, sortedPackBtn, min, max, currentPackId]);

    if (!isLoggedIn) {
        return <Navigate to={routes.login}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section style={{backgroundColor: "yellow", height: "100vh"}}>
                    <Header/>
                    <main style={{backgroundColor: "black"}}>
                        <aside style={{backgroundColor: "green"}}>

                            filtred:
                            <div>
                                <SuperButton onClick={addPackHandler}>Add Pack</SuperButton>
                                <SuperButton onClick={setAllPacks}>My</SuperButton>
                                <SuperButton onClick={setMyPacks}>All</SuperButton>
                            </div>
                            <div>
                                <SuperInputText
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.currentTarget.value)}
                                />
                                <SuperButton onClick={sendInput}>SEND</SuperButton>
                            </div>
                            <DoubleRange min={minRange} max={maxRange}/>
                        </aside>

                        <div className={tableS.table}>
                            <ul className={tableS.tableItem}>
                                <li>Name</li>
                                <li>Cards</li>
                                <li>Last Updated</li>
                                <li>Created by</li>
                                <li>Actions</li>
                            </ul>
                            <div style={{backgroundColor: "orange"}}>
                                {pack.map((p) => {
                                    return <TableItem pack={p} deletePack={deletePackHandler} editPack={editPackHandler}/>
                                })}
                            </div>
                        </div>
                    </main>
                </section>
            )}
        </>
    );
};