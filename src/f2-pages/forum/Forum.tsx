import { Header } from "../../f1-main/m1-ui/components/common";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../f1-main/m3-dal/firebase/config";
import { useEffect, useState } from "react";
import {getAllForumBranchesTC} from "../../f1-main/m2-bll/reducers/forumReducer/forumReducer";
import {useDispatch} from "react-redux";

export const Forum = () => {
  const colRef = collection(db, "branches");
  const [aaa, setAaa] = useState([]);
  const [newChatName, setNewChatName] = useState("")
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getAllForumBranchesTC(colRef))
  }, []);

  const addToServer = () => {
    addDoc(colRef, {
      chat: {
        name: newChatName,
        data: [
          // {
          //   createdData: Date.now(),
          //   message: "New ting2",
          //   userName: "kiril2",
          // },
        ],
      },
    }).then((res) => console.log(res));
  };

  const deleteToServer = (id: string) => {
    const docRef = doc(db, "branches", id);
    deleteDoc(docRef);
  };

  console.log(aaa);

  return (
    <div>
      <Header />
      <div>
        <h1>Forum will be here</h1>
        <input onChange={(e)=>setNewChatName(e.target.value)}/>

        {aaa &&
          aaa.map((m, i) => {
            return (
              <div key={Math.random() * i}>
                {/*// @ts-ignore*/}
                {m.chat.name}
                {/*// @ts-ignore*/}
                <button onClick={() => deleteToServer(m.id)}>{m.id}</button>
              </div>
            );
          })}
        <button onClick={addToServer}>add</button>
      </div>
    </div>
  );
};
