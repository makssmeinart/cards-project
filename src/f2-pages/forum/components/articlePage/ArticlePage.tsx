import { useEffect } from "react";
import { getAllForumBranchesTC } from "../../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { useDispatch, useSelector } from "react-redux";
import { collection } from "firebase/firestore";
import { db } from "../../../../f1-main/m3-dal/firebase/config";
import { selectAllForums } from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { useParams } from "react-router-dom";

export const ArticlePage = () => {
  const colRef = collection(db, "branches");
  const dispatch = useDispatch();
  const { forumId } = useParams();

  const forum = useSelector(selectAllForums).find(
    (forum) => forum.id === forumId
  );

  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef));
  }, []);

  return <section>Article Page</section>;
};
