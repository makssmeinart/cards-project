import {Link} from "react-router-dom";
import {routes} from "../../../../m2-bll/routes/routes";
import React from "react";
import {useDispatch} from "react-redux";
import {LogoutTC} from "../../../../m2-bll/reducers/login/loginReducer";
import {SuperButton} from "../superButton/SuperButton";

export const Header = () => {

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(LogoutTC());
    };

    return (
        <header style={{backgroundColor: "red"}}>
            <h1>Header</h1>
            <ul>
                <li>
                    <Link to={routes.packList}>packList</Link>
                </li>
                <li>
                    <Link to={routes.profile}>Profile Page</Link>
                </li>
            </ul>
            <SuperButton onClick={logout}>Logout</SuperButton>
        </header>
    )
}