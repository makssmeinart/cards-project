import {
  ForumType,
  getAllForumBranchesTC,
} from "../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { NavLink } from "react-router-dom";
import { db } from "../../../f1-main/m3-dal/firebase/config";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import s from "./Article.module.css";
import { SuperButton } from "../../../f1-main/m1-ui/components/common";
import { RootAppStateType } from "../../../f1-main/m2-bll/store";

export const Article = ({ article }: ArticlePropsType) => {
  const dispatch = useDispatch();
  const colRef = collection(db, "branches");
  const deleteToServer = (id: string) => {
    const docRef = doc(db, "branches", id);
    deleteDoc(docRef).then(() => {
      dispatch(getAllForumBranchesTC(colRef));
    });
  };

  const email = useSelector<RootAppStateType>((state) => state.login.email);

  const lastMessage =
    article.chat.data.length &&
    article.chat.data[article.chat.data.length - 1].message;
  const lastMessageAuthor =
    article.chat.data.length &&
    article.chat.data[article.chat.data.length - 1].userName;
  const today =
    article.chat.data.length &&
    Number(article.chat.data[article.chat.data.length - 1].createdData);

  const date = new Date(today)
    .toISOString()
    .replace("-", "/")
    .split("T")[0]
    .replace("-", "/");

  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.content}>
          <div className={s.wrapperArticleInfo}>
            <h2 className={s.title}>
              <NavLink to={`/forum/${article.id}`}>{article.chat.name}</NavLink>
            </h2>
            <div className={s.adminName}>{article.chat.isAdmin}</div>
          </div>


          <div className={s.lastMessageContainer}>
            {article.chat.data.length ? (
              <>
                <p>Last Message: {lastMessage}</p>
                <div className={s.dateAndAuthor}>
                  <p>Author: {lastMessageAuthor}</p>
                  <p>{date}</p>
                </div>
              </>
            ) : (
              <div>Empty</div>
            )}
          </div>
        </div>

        <div className={s.buttonsWrapper}>
          {email === article.chat.isAdmin && (
            <SuperButton
              className={"secondaryButton"}
              onClick={() => deleteToServer(article.id)}
            >
              Delete
            </SuperButton>
          ) }
        </div>
      </div>
    </div>
  );
};

export type ArticlePropsType = {
  article: ForumType;
};
