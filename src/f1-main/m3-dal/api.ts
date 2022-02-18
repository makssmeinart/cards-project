import axios, { AxiosResponse } from "axios";
import { RecoverPasswordFormValues } from "../../f2-pages/auth/recoverPassword/RecoverPassword";
import { InitStateType } from "../m2-bll/reducers/login/loginReducer";

// Axios Instance
const instance = axios.create({
  baseURL: "https://neko-back.herokuapp.com/2.0",
  // baseURL: "http://localhost:7542/2.0/",
  withCredentials: true,
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
                            <a href='http://localhost:3000/cards-project#/new-password/$token$'>link</a></div>`,
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
  getPacks: (packName: string, min: number, max: number, sortPacks: string, page: number, pageCount: number, user_id?: string) => {
    return instance.get("/cards/pack", {
      params: {
        packName,
        min,
        max,
        sortPacks,
        page,
        pageCount,
        user_id,
      },
    });
  },
  deletePacks: (id: string) => {
    return instance.delete("/cards/pack", {
      params: {
        id,
      },
    });
  },
  addPack: (name?: string, deckCover?: string, statusPrivate?: boolean) => {
    return instance.post("/cards/pack", {
      cardsPack: {
        name,
        path: "/def",
        grade: 0,
        shots: 0,
        rating: 0,
        deckCover,
        private: statusPrivate,
        type: "pack",
      },
    });
  },
  editPack: (_id: string, name?: string) => {
    return instance.put("/cards/pack", {
      cardsPack: {
        _id,
        name,
      },
    });
  },
};
export const cardsApi = {
  getCards: (cardAnswer: string, cardQuestion: string, cardsPack_id: string, min: number, max: number, sortCards: string, page: number, pageCount: number) => {
    return instance.get("/cards/card", {
      params: {
        cardAnswer,
        cardQuestion,
        cardsPack_id,
        min,
        max,
        sortCards,
        page,
        pageCount,
      },
    });
  },
  addCard: (cardsPack_id?: string, question?: string, answer?: string, grade?: number, shots?: number, answerImg?: string, questionImg?: string, questionVideo?: string, ) => {
    return instance.post("cards/card", {
      card: {
        cardsPack_id, question, answer, grade,  shots, answerImg, questionImg, questionVideo
      }
    })
  },
  editCard: (_id: string, question: string)=> {
    return instance.put("cards/card", {
      card: {
        _id, question,
      }
    })
  },
  deleteCard: (cardId: string) => {
    return instance.delete("cards/card", {params: {id:cardId}})
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
