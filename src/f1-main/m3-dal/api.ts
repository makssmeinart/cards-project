import axios, { AxiosResponse } from "axios";
import { RecoverPasswordFormValues } from "../../f2-pages/auth/recoverPassword/RecoverPassword";
import { InitStateType } from "../m2-bll/reducers/login/loginReducer";

// Axios Instance
const instance = axios.create({
  // https://neko-back.herokuapp.com/2.0
  baseURL: "https://neko-back.herokuapp.com/2.0",
  withCredentials: true,
});

const instanceForum = axios.create({
  baseURL: "https://backendforum.herokuapp.com/api/",
});

export const authApi = {
  recoverPassword: (values: RecoverPasswordFormValues) => {
    return axios.post<
      AuthForgotDataType,
      AxiosResponse<AuthForgotResponseType>
    >(
      "/auth/forgot",
      {
        email: values.email,
        from: `test-front-admin <${values.email}>`,
        message: `<div > password recovery link: 
                            <a href='https://makssmeinart.github.io/cards-project/#/new-password/$token$'>link</a></div>`,
      },
      {
        baseURL: "https://neko-back.herokuapp.com/2.0",
        withCredentials: true,
      }
    );
  },
  login(data: LoginParamsType) {
    return instance.post<InitStateType>("/auth/login", data);
  },
  logout: () => {
    return instance.delete<Pick<CommonRecoveryResponse, "info">>("/auth/me");
  },
  authMe() {
    return instance.post<InitStateType>("/auth/me", {});
  },
  register(data: RegisterDataType) {
    return instance.post<any>("/auth/register", data);
  },
  setNewPassword(newPass: string, resToken: string) {
    return instance.post<any>("/auth/set-new-password", {
      password: newPass,
      resetPasswordToken: resToken,
    });
  },
};
export const packsApi = {
  getPacks: (payload: FetchPacksPayload) => {
    return instance.get("/cards/pack", {
      params: {
        ...payload,
      },
    });
  },
  deletePacks: (payload: DeletePackPayload) => {
    return instance.delete("/cards/pack", {
      params: {
        ...payload,
      },
    });
  },
  addPack: (payload: AddPackPayload) => {
    return instance.post("/cards/pack", {
      cardsPack: {
        ...payload,
      },
    });
  },
  editPack: (payload: EditPackPayload) => {
    return instance.put("/cards/pack", {
      cardsPack: {
        ...payload,
      },
    });
  },
};
export const cardsApi = {
  getCards: (payload: GetCardsPayload) => {
    return instance.get("/cards/card", {
      params: { ...payload },
    });
  },
  addCard: (payload: AddCardPayload) => {
    return instance.post("cards/card", {
      card: {
        ...payload,
      },
    });
  },
  editCard: (payload: EditCardsPayload) => {
    return instance.put("cards/card", {
      card: {
        ...payload,
      },
    });
  },
  deleteCard: (cardId: string) => {
    return instance.delete("cards/card", { params: { id: cardId } });
  },
  gradeCard: (payload: GradeCardPayload) => {
    return instance.put("cards/grade", { ...payload });
  },
  addQuestionFile: (file: Blob) => {
    return instance.post(
      "file",
      {
        formData: { myFile: file },
      },
      {
        baseURL: "https://dry-forest-56016.herokuapp.com",
        withCredentials: true,
      }
    );
  },
};

export const forumApi = {
  getAllForums: () => {
    return instanceForum.get("forums");
  },
  createForum: (payload: CreateForumPayload) => {
    return instanceForum.post("forums", { ...payload });
  },
  deleteForum: (idForum: string) => {
    return instanceForum.delete(`forums/${idForum}`);
  },
};
export const messageApi = {
  getAllMessagesById: (forumId: string) => {
    return instanceForum.get(`messages/${forumId}`);
  },
  sendMessage: (payload: SendMessagePayload) => {
    return instanceForum.post(`message`, { ...payload });
  },
  deleteMessage: (id: string) => {
    return instanceForum.delete(`/message/${id}`)
  }
};

// Types
type CommonRecoveryResponse = {
  info: string;
  error?: string;
};
type AuthForgotDataType = {
  email: string;
  from: string;
  message: string;
};
type AuthForgotResponseType = {
  answer: boolean;
  html: boolean;
  info: string;
  success: boolean;
};
export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type RegisterDataType = {
  email: string;
  password: string;
};

// Packs
export type FetchPacksPayload = {
  packName: string;
  min: number;
  max: number;
  sortPacks: string;
  page: number;
  pageCount: number;
  user_id?: string;
};

export type AddPackPayload = {
  name: string;
  path: string;
  grade: number;
  shots: number;
  rating: number;
  deckCover: string;
  private: boolean;
  type: string;
};

export type EditPackPayload = {
  _id: string;
  name?: string;
};

export type DeletePackPayload = {
  id: string;
};

// Cards
export type CardsCommonPayloadType = {
  cardsPack_id: string;
  cardsQuestion: string;
  cardsAnswer: string;
};

export type GetCardsPayload = {
  cardAnswer: string;
  cardQuestion: string;
  cardsPack_id: string;
  min: number;
  max: number;
  sortCards: string;
  page: number;
  pageCount: number;
};

export type AddCardPayload = {
  cardsPack_id?: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: any;
  questionVideo?: string;
};

export type EditCardsPayload = {
  _id: string;
  question: string;
  answer: string;
};

export type GradeCardPayload = {
  grade: number;
  card_id: string;
};

export type CreateForumPayload = {
  _id?: string;
  createDate: string;
  isAdmin: string;
  name: string;
};

export type SendMessagePayload = {
  createDate: string;
  message: string;
  userName: string;
  forumId: string;
};
