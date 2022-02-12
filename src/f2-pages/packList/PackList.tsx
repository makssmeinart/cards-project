import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect, useState} from "react";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {inputChangeHandlerAC, packsReducerTC, sortedPackBtnAC} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {SuperInputText} from "../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {appStatusSelector, isLoggedInSelector, maxRangeSelector, maxSelector, minRangeSelector, minSelector, packNameSelector, packSelector} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {DoubleRange} from "../../f1-main/m1-ui/components/common/doubleRange/DoubleRange";


export const PackList = () => {
        const dispatch = useDispatch();
        const [inputValue, setInputValue] = useState<string>("")
        const [sortedPackBtn, setSortedPackBtn] = useState<boolean>(true)
        const packName = useSelector(packNameSelector)
        const status = useSelector(appStatusSelector)
        const pack = useSelector(packSelector)
        const isLoggedIn = useSelector(isLoggedInSelector)
        const minRange = useSelector(minRangeSelector)
        const maxRange = useSelector(maxRangeSelector)
        const max = useSelector(maxSelector)
        const min = useSelector(minSelector)

        const sendInput = () => {
            dispatch(inputChangeHandlerAC(inputValue))
        }
        const setMyPacks = () => {
            setSortedPackBtn(true)

            dispatch(sortedPackBtnAC(sortedPackBtn))
        }

        const setAllPacks = () => {
            setSortedPackBtn(false)

            dispatch(sortedPackBtnAC(sortedPackBtn))
        }
        useEffect(() => {
            dispatch(packsReducerTC())
        }, [packName, sortedPackBtn, min, max])



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
                                    <SuperButton onClick={setAllPacks}>My</SuperButton>
                                    <SuperButton onClick={setMyPacks}>All</SuperButton>
                                </div>
                                <div>
                                    <SuperInputText value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                                    <SuperButton onClick={sendInput}>SEND</SuperButton>
                                </div>
                                <DoubleRange min={minRange} max={maxRange}/>
                            </aside>

                            <div style={{backgroundColor: "pink"}}>

                                {pack.map(p => {
                                    return <div key={p._id}>{p.name}</div>
                                })}
                            </div>
                        </main>


                    </section>
                )}
            </>
        );
    }
;
