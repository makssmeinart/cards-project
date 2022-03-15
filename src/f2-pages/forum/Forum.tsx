import {
  Header,
  Loading,
  SuperButton,
  SuperInputText,
} from "../../f1-main/m1-ui/components/common";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Forum.module.css";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { PendingStatusType } from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import {
  getEmailSelector,
  selectAllForums,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { getAllForumsTC } from "../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { Article } from "./components/Article";
import { CreateForumPayload, forumApi } from "../../f1-main/m3-dal/api";

export const Forum = () => {
  const [newChatValue, setNewChatValue] = useState("");
  const dispatch = useDispatch();
  const status = useSelector<RootAppStateType, PendingStatusType>(
    (state) => state.app.status
  );
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );

  // https://backendforum.herokuapp.com/api/messages

  useEffect(() => {
    dispatch(getAllForumsTC());
  }, []);

  const email = useSelector(getEmailSelector);

  const addToServer = () => {
    let time = new Date().getTime();
    const payload: CreateForumPayload = {
      isAdmin: email,
      name: newChatValue,
      createDate: String(time),
    };

    forumApi.createForum(payload).then(()=> {
      dispatch(getAllForumsTC());
    });

    setNewChatValue("");
  };

  const allForums = useSelector(selectAllForums);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div>
          <Header />

          <div className={s.container}>
            <h1>Forums:</h1>
            <div className={s.formsWrapper}>
              <SuperInputText
                placeholder={"Enter new Forum name"}
                value={newChatValue}
                onChange={(e) => setNewChatValue(e.target.value)}
              />
              <SuperButton className={"primaryButton"} onClick={addToServer}>
                Add
              </SuperButton>
            </div>
            <div className={s.content}>
              {allForums.map((article) => {
                return <Article key={article._id} article={article} />;
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
