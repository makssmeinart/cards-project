import { Header } from "../../f1-main/m1-ui/components/common";
import { collection, addDoc} from "firebase/firestore";
import { db } from "../../f1-main/m3-dal/firebase/config";
import { useEffect } from "react";
import { getAllForumBranchesTC } from "../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { useDispatch, useSelector } from "react-redux";
import { selectAllForums } from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { Article } from "./components/Article";

export const Forum = () => {
  const colRef = collection(db, "branches");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef));
  }, []);

  const allForums = useSelector(selectAllForums);

  const addToServer = () => {
    addDoc(colRef, {
      chat: {
        name: "Zlupa",
        data: [
          {
            createdData: Date.now(),
            message: "New ting2",
            userName: "kiril2",
          },
        ],
      },
    }).then((res) => console.log(res));
  };

  // const deleteToServer = (id: string) => {
  //   const docRef = doc(db, "branches", id);
  //   deleteDoc(docRef);
  // };

  return (
    <div>
      <Header />
      <div>
        <h1>Forum will be here</h1>
        {allForums.map((article) => {
          return <Article key={article.id} article={article} />;
        })}
          <button onClick={addToServer}>ADd</button>
      </div>
    </div>
  );
};
