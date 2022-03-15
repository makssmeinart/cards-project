import {
  getAllMessagesByIdTC,
  InitialStateType,
} from "../../../../../f1-main/m2-bll/reducers/forumMessageReducer/forumMessageReducer";
import { useDispatch, useSelector } from "react-redux";
import { getEmailSelector } from "../../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { SuperButton } from "../../../../../f1-main/m1-ui/components/common";
import { messageApi } from "../../../../../f1-main/m3-dal/api";
import { useParams } from "react-router-dom";
import s from "./Message.module.css";

export const Message = ({ message }: MessagePropsType) => {
  const email = useSelector(getEmailSelector);
  const { forumId } = useParams();
  const dispatch = useDispatch();

  const deleteMessageHandler = (id: string) => {
    messageApi.deleteMessage(id).then(() => {
      forumId && dispatch(getAllMessagesByIdTC(forumId));
    });
  };

  const messageClass =
    message.userName === email ? `${s.myWrapper}` : `${s.wrapper}`;

  // const date = new Date(+message.createDate)
  //     .toISOString()
  //     .replace("-", "/")
  //     .split("T")[0]
  //     .replace("-", "/");

  const date = new Date(+message.createDate);

  return (
    <div className={messageClass} key={message._id}>
      <div className={s.avatar}>
        <img
          src="https://v2.cimg.co/news/59669/22919/screenshot-2021-09-06-at-16-07-20-101-bored-ape-yacht-club-ape-in-2021-sothebys.png"
          alt="User Avatar"
        />
      </div>
      <div className={s.content}>
        <div className={s.info}>
          <div className={s.deleteButton}>
            {message.userName === email && (
              <SuperButton
                className={"miniDeleteMessageButton"}
                onClick={() => deleteMessageHandler(message._id)}
              >
                X
              </SuperButton>
            )}
          </div>
          <div className={s.message}>{message.message}</div>

          <div className={s.options}>
            <div>
              <div className={s.userName}>{message.userName}</div>
            </div>
            <div className={s.date}>
              {date.toLocaleString("en-GB", {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export type MessagePropsType = {
  message: InitialStateType;
};
