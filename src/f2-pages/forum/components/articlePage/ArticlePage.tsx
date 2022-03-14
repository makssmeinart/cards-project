import { useEffect, useState } from "react";
import { getAllForumBranchesTC } from "../../../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../../f1-main/m3-dal/firebase/config";
import { selectAllForums } from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { useParams } from "react-router-dom";
import { Header } from "../../../../f1-main/m1-ui/components/common";
import { RootAppStateType } from "../../../../f1-main/m2-bll/store";
import axios from "axios";

export const ArticlePage = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { forumId } = useParams();

  const colRef = collection(db, `branches`);

  const forum = useSelector(selectAllForums).filter(
    (forum) => forum.id === forumId
  );

  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef));
  }, []);

  const email = useSelector<RootAppStateType>((state) => state.login.email);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts", { withCredentials: true }).then(res => console.log(res))
  }, []);

  const addToServer = () => {
    let time = new Date().getTime();

    //@ts-ignore
    addDoc({
      chat: {
        name: forum[0].chat.name,
        isAdmin: email,
        data: [
          {
            createdData: time,
            message: inputValue,
            userName: email,
          },
        ],
      },
    }).then((res) => {
      setInputValue("");
      dispatch(getAllForumBranchesTC(colRef));
    });
  };

  return (
    <section>
      <Header />
      {forum[0] &&
        forum[0].chat.data.map((m, i) => {
          return <div key={Math.random() * i}>{m.message}</div>;
        })}

      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addToServer}>send</button>
    </section>
  );
};
