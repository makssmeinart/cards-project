import { Dispatch } from "redux";
import { getDocs } from "firebase/firestore";
import { changeStatus } from "../appReducer/appReducer";
import { serverErrorHandling } from "../../../m4-utility";

const initState: ForumType[] = [];

export const forumReducer = (
  state: ForumType[] = initState,
  action: ActionTypes
): ForumType[] => {
  switch (action.type) {
    case "FORUM/SET-ALL-FORUM-BRANCHES": {
      return [...action.data];
    }
    default:
      return state;
  }
};

// Action Creators
const setAllForumBranches = (data: Array<ForumType>) => {
  return { type: "FORUM/SET-ALL-FORUM-BRANCHES", data } as const;
};

// Thunk
export const getAllForumBranchesTC = (colRef: any) => (dispatch: Dispatch) => {
  dispatch(changeStatus("loading"));

  getDocs(colRef)
    .then((snapshot: any) => {
      dispatch(changeStatus("completed"));

      let branches: Array<ForumType> = [];
      snapshot.docs.forEach((doc: any) => {
        branches.push({ ...doc.data(), id: doc.id });
      });


      dispatch(setAllForumBranches(branches));
    })
    .catch((err) => {
      serverErrorHandling(err, dispatch);
    });
};

// Types
export type ForumType = {
  chat: ChatType;
  id: string;
};
type ChatType = {
  name: string;
  isAdmin: string;
  data: ChatDataType[];
};
type ChatDataType = {
  createdData: number;
  message: string;
  userName: string;
  messageId: string;
};

type ActionTypes = ReturnType<typeof setAllForumBranches>;
