import {useDispatch, useSelector} from "react-redux";
import {LogoutTC} from "../../f1-main/m2-bll/reducers/login/loginReducer";
import {RootAppStateType} from "../../f1-main/m2-bll/store";
import {Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {PendingStatusType} from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect, useState} from "react";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {
    cardPacksType,
    inputChangeHandlerAC,
    packsReducerTC
} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {SuperInputText} from "../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";


export const PackList = () => {
        const filter = useSelector<RootAppStateType>(state => state.packs.filter)
        const [inpState, setinpState] = useState<string>("")


        const dispatch = useDispatch();
        debugger
        const status = useSelector<RootAppStateType, PendingStatusType>(
            (state) => state.app.status
        );
        const pack = useSelector<RootAppStateType, cardPacksType[]>(state => state.packs.cardPacks)
        const isLoggedIn = useSelector<RootAppStateType>(
            (state) => state.app.isLoggedIn
        );

        const logout = () => {
            dispatch(LogoutTC());
        };

        useEffect(() => {
            dispatch(packsReducerTC())
        }, [filter])

        const send = () => {
            dispatch(inputChangeHandlerAC(inpState))
        }


        if (!isLoggedIn) {
            return <Navigate to={routes.login}/>;
        }


        return (
            <>
                {status === "loading" ? (
                    <Loading/>
                ) : (
                    <section style={{backgroundColor: "black", height: "100vh"}}>
                        <Header/>

                        <SuperInputText value={inpState} onChange={(e) => setinpState(e.currentTarget.value)}/>
                        <SuperButton onClick={send}>SEND</SuperButton>
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
