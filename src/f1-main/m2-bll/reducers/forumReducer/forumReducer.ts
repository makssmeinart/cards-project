import { Dispatch } from "redux";
import { getDocs } from "firebase/firestore";

const initState: InitStateType = [
  {
    chat: {
      name: "string",
      data: [
        {
          createdData: 1,
          message: "string",
          userName: "string",
        },
      ],
    },
    id: "string",
  },
];

export const forumReducer = (
  state = initState,
  action: ActionTypes
): InitStateType => {
  switch (action.type) {
    default:
      return state;
  }
};

// Action Creators

// Thunk
export const getAllForumBranchesTC = (colRef: any) => (dispatch: Dispatch) => {
  getDocs(colRef).then((snapshot: any) => {
    let temp: any = [];
    snapshot.docs.forEach((doc: any) => {
      console.log(doc);
      temp.push({ ...doc.data(), id: doc.id });
    });
    console.log(temp);
  });
};

// Types
export type InitStateType = [
  {
    chat: {
      name: string;
      data: [
        {
          createdData: number;
          message: string;
          userName: string;
        }
      ];
    };
    id: string;
  }
];

type ActionTypes = any;
