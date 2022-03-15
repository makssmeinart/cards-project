import {
  LegacyRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { Message } from "./message/Message";

export const ArticlePage = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { forumId } = useParams();

  const email = useSelector(getEmailSelector);

  useEffect(() => {
    forumId && dispatch(getAllMessagesByIdTC(forumId));
  }, []);

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

  const scrollItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollItem.current) {
      scrollItem.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sendMessageHandler]);

  return (
    <>
      <Header />
      <section className={s.wrapper}>
        <div className={s.inner}>
          <div className={s.content}>
            {allMessagesById.map((m) => {
              return <Message key={m._id} message={m} />;
            })}
            <div ref={scrollItem} />
          </div>
          <div className={s.optionsWrapper}>
            <div className={s.options}>
              <SuperInputText
                placeholder={"Enter new message"}
                value={inputValue}
                onChange={(e) => setInputValue(e.currentTarget.value)}
                onEnter={sendMessageHandler}
              />
              <SuperButton
                style={{ maxWidth: "150px" }}
                className={"primaryButton"}
                onClick={sendMessageHandler}
              >
                Send
              </SuperButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
