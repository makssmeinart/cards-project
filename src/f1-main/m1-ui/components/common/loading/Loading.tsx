import React from "react";
import s from "./Loading.module.css";

export const Loading = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.cssloadContainer}>
        <div className={s.cssloadWhirlpool} />
      </div>
    </div>
  );
};
