import { Header } from "../../f1-main/m1-ui/components/common";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../f1-main/m3-dal/firebase/config";
import { useEffect } from "react";

export const Forum = () => {
  const colRef = collection(db, "branches");

  useEffect(() => {
    getDocs(colRef).then((snapshot: any) => {
      let temp: any = [];
      snapshot.docs.forEach((doc: any) => {
        console.log(doc);
        temp.push({ ...doc.data(), id: doc.id });
      });

      console.log(temp);
    });
  }, []);

  const addToServer = () => {
    addDoc(colRef, {
      secondChat: {
        name: "Second Chat",
        data: [
          {
            createdData: Date.now(),
            message: "New ting",
            userName: "kiril",
          },
        ],
      },
    }).then((res) => console.log(res.id));
  };

  return (
    <div>
      <Header />
      <div>
        <h1>Forum will be here</h1>
        <button onClick={addToServer}>Chupa </button>
      </div>
    </div>
  );
};
