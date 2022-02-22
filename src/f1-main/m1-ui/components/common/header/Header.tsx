import {Link, NavLink} from "react-router-dom";
import headerS from "./header.module.css";
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
        <header className={headerS.header}>
            <h1 className={headerS.title}>LearnBy-Cards</h1>
            <div className={headerS.itemsWrapper}>
                <NavLink className={({ isActive }) => (isActive ? headerS.activeRoute : headerS.item)} to={routes.packList}>Pack lists</NavLink>
                <NavLink className={({ isActive }) => (isActive ? headerS.activeRoute : headerS.item)} to={routes.profile}>Profile page</NavLink>
            </div>
            <SuperButton className={"border-button"}
                         onClick={logout}>Logout</SuperButton>
        </header>
    );
};
