import s from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React, { useEffect, useState } from "react";
import { inputChangeHandlerAC } from "../../../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import { useDispatch } from "react-redux";
import {
  SuperButton,
  SuperInputText,
} from "f1-main/m1-ui/components/common";
import {fireAddPackModal, useDebounced} from "f1-main/m4-utility";

export const PacksSearch = React.memo(() => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const inputValueDebounced = useDebounced(inputValue);

  useEffect(() => {
    dispatch(inputChangeHandlerAC(inputValueDebounced));
  }, [inputValueDebounced]);

  return (
    <div className={s.search}>
      <SuperInputText
        onChange={(e) => setInputValue(e.currentTarget.value)}
        placeholder={"Search pack by name"}
      />

      <div className={s.searchButtonWrapper}>
        <SuperButton
          className={"primaryButton"}
          style={{ width: "250px" }}
          onClick={() => fireAddPackModal(dispatch)}
        >
          Add new pack
        </SuperButton>
      </div>
    </div>
  );
});
