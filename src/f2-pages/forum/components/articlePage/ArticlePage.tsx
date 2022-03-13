import { useEffect } from "react";
import { getAllForumBranchesTC } from "../../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "firebase/firestore";
import { db } from "../../../../f1-main/m3-dal/firebase/config";
import { selectAllForums } from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { useParams } from "react-router-dom";
import s from "./ArticlePage.module.css";
import {Header} from "../../../../f1-main/m1-ui/components/common";

export const ArticlePage = () => {
  const colRef = collection(db, "branches");
  const dispatch = useDispatch();
  const { forumId } = useParams();

  const forum = useSelector(selectAllForums).filter(
    (forum) => forum.id === forumId
  );

  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef));
  }, []);

  console.log(forum);

  return (
    <section>
      <Header/>
      {forum[0] &&
        forum[0].chat.data.map((m, i) => {
          return <div key={Math.random() * i}>{m.message}</div>;
        })}
    </section>
  );
};
