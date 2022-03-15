import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from "./ArticlePage.module.css";
import {
  Header,
  SuperButton,
  SuperInputText,
} from "../../../../f1-main/m1-ui/components/common";
import { getAllMessagesByIdTC } from "../../../../f1-main/m2-bll/reducers/forumMessageReducer/forumMessageReducer";
import {
  getEmailSelector,
  selectAllMessages,
} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { messageApi, SendMessagePayload } from "../../../../f1-main/m3-dal/api";

export const ArticlePage = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { forumId } = useParams();

  useEffect(() => {
    forumId && dispatch(getAllMessagesByIdTC(forumId));
  }, []);

  const email = useSelector(getEmailSelector);

  const allMessagesById = useSelector(selectAllMessages);
  const sendMessageHandler = () => {
    const payload: SendMessagePayload = {
      createDate: String(new Date().getTime()),
      message: inputValue,
      userName: email,
      forumId: forumId ? forumId : "",
    };
    messageApi.sendMessage({ ...payload }).then(() => {
      setInputValue("");
      forumId && dispatch(getAllMessagesByIdTC(forumId));
    });
  };
  const deleteMessageHandler = (id: string) => {
    messageApi.deleteMessage(id).then(() => {
      forumId && dispatch(getAllMessagesByIdTC(forumId));
    });
  };

  return (
    <section>
      <Header />

      {allMessagesById.map((m) => {
        return (
          <div key={m._id}>
            {m.message} {m.userName}
            {m.userName === email ? (
              <SuperButton onClick={() => deleteMessageHandler(m._id)}>
                delete
              </SuperButton>
            ) : null}
          </div>
        );
      })}

      <SuperInputText
        value={inputValue}
        onChange={(e) => setInputValue(e.currentTarget.value)}
      />
      <SuperButton onClick={sendMessageHandler}>Send</SuperButton>
    </section>
  );
};
