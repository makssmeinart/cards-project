import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./Article.module.css";
import { SuperButton } from "../../../f1-main/m1-ui/components/common";
import {
  getAllForumsTC,
  InitialStateType,
} from "../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { forumApi } from "../../../f1-main/m3-dal/api";
import {getEmailSelector} from "../../../f1-main/m2-bll/selectors/selectAppStatus";

export const Article = ({ article }: ArticlePropsType) => {
  const dispatch = useDispatch();

  const email = useSelector(getEmailSelector);

  const deleteForumHandler = (forumId: string) => {
    forumApi.deleteForum(forumId).then(() => {
      dispatch(getAllForumsTC());
    });
  };

  const date = new Date(+article.createDate)
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
              <NavLink to={`/forum/${article._id}`}>{article.name}</NavLink>
            </h2>
          </div>

          <div className={s.lastMessageContainer}>
            <>
              <p>Forum created: {date}</p>
              <div className={s.dateAndAuthor}>
                <p>Author: {article.isAdmin}</p>
              </div>
            </>
          </div>
        </div>

        <div className={s.buttonsWrapper}>
          {email === article.isAdmin && (
            <SuperButton
              className={"secondaryButton"}
              onClick={() => deleteForumHandler(article._id)}
            >
              Delete
            </SuperButton>
          )}
        </div>
      </div>
    </div>
  );
};

export type ArticlePropsType = {
  article: InitialStateType;
};
