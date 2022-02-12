import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect, useState} from "react";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {inputChangeHandlerAC, packsReducerTC} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {SuperInputText} from "../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {appStatusSelector, isLoggedInSelector, packNameSelector, packSelector} from "../../f1-main/m2-bll/selectors/selectAppStatus";


export const PackList = () => {
        const dispatch = useDispatch();
        const [inputValue, setInputValue] = useState<string>("")
        const packName = useSelector(packNameSelector)
        const status = useSelector(appStatusSelector)
        const pack = useSelector(packSelector)
        const isLoggedIn = useSelector(isLoggedInSelector)

        const sendInput = () => {
            dispatch(inputChangeHandlerAC(inputValue))
        }
        useEffect(() => {
            debugger
            dispatch(packsReducerTC())
        }, [packName])



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

                        <SuperInputText value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value)}/>
                        <SuperButton onClick={sendInput}>SEND</SuperButton>
                        <main style={{backgroundColor: "black"}}>
                            <aside style={{backgroundColor: "green"}}>
                                1
                            </aside>
                            <div style={{backgroundColor: "pink"}}>
                                {pack.map(p => {
                                    return <div>{p.name}</div>
                                })}
                            </div>
                        </main>


                    </section>
                )}
            </>
        );
    }
;
