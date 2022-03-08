import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../../f2-pages/auth/login/Login";
import { routes } from "../m2-bll/routes/routes";
import { Register } from "../../f2-pages/auth/register/Register";
import { NewPassword } from "../../f2-pages/auth/newPassword/NewPassword";
import { RecoverPassword } from "../../f2-pages/auth/recoverPassword/RecoverPassword";
import { Profile } from "../../f2-pages/profile/Profile";
import { PageNotFound } from "../../f2-pages/error/pageNotFound/PageNotFound";
import { useDispatch, useSelector } from "react-redux";
import { authMeTC } from "../m2-bll/reducers/appReducer/appReducer";
import { RootAppStateType } from "../m2-bll/store";
import "./App.css";
import { PackList } from "../../f2-pages/packList/PackList";
import { CardsList } from "../../f2-pages/cardsList/CardsList";
import { Learn } from "../../f2-pages/learn/Learn";
import { Loading } from "./components/common";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authMeTC());
  }, [dispatch]);

  const isInitialized = useSelector<RootAppStateType>(
    (state) => state.app.isInitialized
  );

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <section className="wrapper">
      <Routes>
        <Route path={routes.home} element={<Navigate to={routes.profile} />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.newPassword} element={<NewPassword />} />
        <Route path={routes.recoverPassword} element={<RecoverPassword />} />
        <Route path={routes.pageNotFound} element={<PageNotFound />} />
        <Route path={routes.packList} element={<PackList />} />
        <Route path={routes.cardsList} element={<CardsList />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.packListLearn} element={<Learn />} />
        <Route path={"/*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </section>
  );
};
