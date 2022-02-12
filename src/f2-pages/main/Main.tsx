import {useDispatch, useSelector} from "react-redux";
import {LogoutTC} from "../../f1-main/m2-bll/reducers/login/loginReducer";
import {RootAppStateType} from "../../f1-main/m2-bll/store";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {PendingStatusType} from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React, {useEffect} from "react";
import {cardPacksType, packsReducerTC} from "../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {Home} from "../home/Home";
import {Profile} from "../profile/Profile";
import {Login} from "../auth/login/Login";
import {Register} from "../auth/register/Register";
import {NewPassword} from "../auth/newPassword/NewPassword";
import {RecoverPassword} from "../auth/recoverPassword/RecoverPassword";
import {Test} from "../test/Test";
import {PageNotFound} from "../error/pageNotFound/PageNotFound";


export const Main = () => {
    useEffect(() => {
        dispatch(packsReducerTC())
    }, [packsReducerTC])

    const dispatch = useDispatch();
    const status = useSelector<RootAppStateType, PendingStatusType>(
        (state) => state.app.status
    );
    const packs = useSelector<RootAppStateType, cardPacksType[]>(state => state.packs.cardPacks)

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
                    <header style={{backgroundColor: "red"}}>
                        <h1>Header</h1>
                        <ul>
                            <li>
                                <Link to={routes.main}>packList</Link>
                            </li>
                            <li>
                                <Link to={routes.mainProfile}>Profile Page</Link>
                            </li>
                        </ul>
                    </header>



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
