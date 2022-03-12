import packsS from "../../../../../f1-main/m1-ui/components/common/table/packsListTable.module.css";
import { Link} from "react-router-dom";
import s from "../../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React from "react";
import { cardPacksType } from "../../../../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import { useDispatch, useSelector } from "react-redux";
import { userIdSelector } from "../../../../../f1-main/m2-bll/selectors/selectAppStatus";
import { fireDeleteModal, fireEditPackModal } from "f1-main/m4-utility/modal";
import { SuperButton } from "../../../../../f1-main/m1-ui/components/common";

export const TableItem = ({ pack }: TableItemPropsType) => {
  const dispatch = useDispatch();
  const updateDate = pack.updated.slice(0, 10);
  const myId = useSelector(userIdSelector);

  return (
    <div className={packsS.items}>
      <Link to={`/main/cards-list/${pack._id}`} className={packsS.item}>
        {pack.name}
      </Link>
      <div className={packsS.item}>{pack.cardsCount}</div>
      <div className={packsS.item}>{updateDate}</div>
      <div className={packsS.item}>{pack.user_name}</div>
      <div className={packsS.item}>
        <div className={s.buttonHolder}>
          {myId === pack.user_id && (
            <>
              <SuperButton
                onClick={() => fireDeleteModal(pack._id, pack.name, dispatch)}
                className={"miniDeleteButton"}
              >
                Delete
              </SuperButton>
              <SuperButton
                onClick={() => fireEditPackModal(pack._id, pack.name, dispatch)}
                className={"miniCommonButton"}
              >
                Edit
              </SuperButton>
            </>
          )}
          <Link
            to={`/main/pack-list-learn/${pack._id}`}
            className={`${packsS.item} ${packsS.itemButton}`}
          >
            Learn
          </Link>
        </div>
      </div>
    </div>
  );
};

// Types

type TableItemPropsType = {
  pack: cardPacksType;
};
