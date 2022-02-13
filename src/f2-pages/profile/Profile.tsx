import { useSelector } from "react-redux";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import { PendingStatusType } from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import { Loading } from "../../f1-main/m1-ui/components/common/loading/Loading";
import React from "react";
import { Header } from "../../f1-main/m1-ui/components/common/header/Header";

export const Profile = () => {
  const status = useSelector<RootAppStateType, PendingStatusType>(
    (state) => state.app.status
  );
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );
  let email = useSelector<RootAppStateType>((state) => state.login.email);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <section>
          <Header />
          <h1 style={{ color: "white" }}>Profile</h1>
          <img
            src="https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31"
            style={{ borderRadius: "50%", width: "150px", height: "150px" }}
            alt="avatar"
          />
          <div style={{ color: "white" }}>Email: {email}</div>
        </section>
      )}
    </>
  );
};
