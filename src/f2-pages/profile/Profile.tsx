import { useSelector } from "react-redux";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import { PendingStatusType } from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import React from "react";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";

export const Profile = () => {
  const status = useSelector<RootAppStateType, PendingStatusType>(
    (state) => state.app.status
  );

  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
          <Loading/>
      ) : (
        <section>
          <Header/>
          <h1>Profile</h1>
        </section>
      )}
    </>
  );
};
