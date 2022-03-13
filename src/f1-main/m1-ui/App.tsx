import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../m2-bll/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { authMeTC } from "../m2-bll/reducers/appReducer/appReducer";
import { RootAppStateType } from "../m2-bll/store";
import "./App.css";
import { Loading } from "./components/common";
import {
  ArticlePage,
  CardsList,
  Forum,
  Learn,
  Login,
  NewPassword,
  PackList,
  PageNotFound,
  Profile,
  RecoverPassword,
  Register,
} from "f2-pages";

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
        <Route path={routes.forum} element={<Forum />} />
        <Route path={routes.currentForum} element={<ArticlePage />} />
        <Route path={routes.cardsList} element={<CardsList />} />
        <Route path={routes.profile} element={<Profile />} />
        <Route path={routes.packListLearn} element={<Learn />} />
        <Route path={"/*"} element={<Navigate to={"/404"} />} />
      </Routes>
    </section>
  );
};
