import { Link, NavLink } from "react-router-dom";
import headerS from "./header.module.css";
import { routes } from "../../../../m2-bll/routes/routes";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LogoutTC } from "../../../../m2-bll/reducers/login/loginReducer";
import { SuperButton } from "../superButton/SuperButton";

export const Header = () => {
  const [burgerOpened, setBurgerOpened] = useState(false);

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(LogoutTC());
  };

  const menuClass = burgerOpened
    ? `${headerS.itemsWrapper} ${headerS.active}`
    : `${headerS.itemsWrapper}`;

  const burgerClass = burgerOpened
    ? `${headerS.burger} ${headerS.active}`
    : `${headerS.burger}`;

  return (
    <header className={headerS.header}>
      <div className={headerS.container}>
        <h1 className={headerS.title}>LearnBy-Cards</h1>
        <div className={menuClass}>
          <NavLink
            className={({ isActive }) =>
              isActive ? headerS.activeRoute : headerS.item
            }
            to={routes.packList}
          >
            Pack lists
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? headerS.activeRoute : headerS.item
            }
            to={routes.profile}
          >
            Profile page
          </NavLink>
          <SuperButton className={"border-button"} onClick={logout}>
            Logout
          </SuperButton>
        </div>
        <div
          onClick={() => setBurgerOpened(!burgerOpened)}
          className={burgerClass}
        >
          <span></span>
        </div>
        <SuperButton
          id={headerS.logout}
          className="border-button"
          onClick={logout}
        >
          Logout
        </SuperButton>
      </div>
    </header>
  );
};
