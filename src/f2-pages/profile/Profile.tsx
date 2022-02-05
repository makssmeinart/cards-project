import { useDispatch, useSelector } from "react-redux";
import { LogoutTC } from "../../f1-main/m2-bll/reducers/login/loginReducer";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import { PendingStatusType } from "../../f1-main/m2-bll/reducers/appReducer/appReducer";

export const Profile = () => {
  const dispatch = useDispatch();
  const status = useSelector<RootAppStateType, PendingStatusType>(
    (state) => state.app.status
  );
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  const logout = () => {
    dispatch(LogoutTC());
  };

  return (
    <>
      {status === "loading" ? (
        <p>loading...</p>
      ) : (
        <section>
          <h1>Profile</h1>
          <button onClick={logout}>Logout</button>
        </section>
      )}
    </>
  );
};
