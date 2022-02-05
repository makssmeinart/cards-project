import { useSelector } from "react-redux";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import React from "react";

export const Profile = () => {
  const authMe = useSelector<RootAppStateType>(
    (state) => state.app.authMe
  );
  if (!authMe) {
    return <Navigate to={routes.login} />;
  }
  return <section>Profile</section>;
};
