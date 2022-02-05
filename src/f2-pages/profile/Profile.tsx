import { useSelector } from "react-redux";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import React from "react";

export const Profile = () => {
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );
  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }
  return <section>Profile</section>;
};
