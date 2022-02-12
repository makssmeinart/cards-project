import {useDispatch, useSelector} from "react-redux";
import {LogoutTC} from "../../f1-main/m2-bll/reducers/login/loginReducer";
import {RootAppStateType} from "../../f1-main/m2-bll/store";
import {Link, Navigate} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {PendingStatusType} from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect} from "react";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {cardPacksType, packsReducerTC} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";

export const PackList = () => {
    useEffect(() => {
        dispatch(packsReducerTC())
    }, [packsReducerTC])

    const dispatch = useDispatch();
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

    if (!isLoggedIn) {
        return <Navigate to={routes.login}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section style={{backgroundColor: "yellow", height: "100vh"}}>
                    <Header />
                    <main style={{backgroundColor: "black"}}>
                        <aside style={{backgroundColor: "green"}}>
                            1
                        </aside>
                        <div style={{backgroundColor: "pink"}}>

                        </div>
                    </main>

                </section>
            )}
        </>
    );
}
;
