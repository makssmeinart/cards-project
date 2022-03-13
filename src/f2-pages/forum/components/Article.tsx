import { ForumType } from "../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { NavLink } from "react-router-dom";

export const Article = ({ article }: ArticlePropsType) => {
  return (
    <NavLink to={`/forum/${article.id}`}>
      <div>
        <div>ava</div>
        <div>
          <h2>{article.chat.name}</h2>
        </div>
      </div>
    </NavLink>
  );
};

export type ArticlePropsType = {
  article: ForumType;
};
