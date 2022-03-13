import {
  Header,
  Loading,
  SuperButton,
  SuperInputText,
} from "../../f1-main/m1-ui/components/common";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../f1-main/m3-dal/firebase/config";
import React, { useEffect, useState } from "react";
import { getAllForumBranchesTC } from "../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectAllForums } from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { Article } from "./components/Article";
import s from "./Forum.module.css";
import { RootAppStateType } from "../../f1-main/m2-bll/store";
import { PendingStatusType } from "../../f1-main/m2-bll/reducers/appReducer/appReducer";
import { Navigate } from "react-router-dom";
import { routes } from "../../f1-main/m2-bll/routes/routes";

export const Forum = () => {
  const [newChatValue, setNewChatValue] = useState("");
  const colRef = collection(db, "branches");
  const dispatch = useDispatch();
  const allForums = useSelector(selectAllForums);
  const status = useSelector<RootAppStateType, PendingStatusType>(
    (state) => state.app.status
  );
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );

  const email = useSelector<RootAppStateType>((state) => state.login.email);

  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef));
  }, []);

  const addToServer = () => {
    let time = new Date().getTime()


    addDoc(colRef, {
      chat: {
        name: newChatValue,
        isAdmin: email,
        data: [
          // {
          //   createdData: time,
          //   message: "New ting2",
          //   userName: "kiril2",
          // },
        ],
      },
    }).then((res) => {
      setNewChatValue("");
      dispatch(getAllForumBranchesTC(colRef));
    });
  };

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

            {allForums.map((article) => {
              return <Article key={article.id} article={article} />;
            })}
          </div>
        </div>
      )}
    </>
  );
};
