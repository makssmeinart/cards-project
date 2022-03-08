import s from "./noCard.module.css";
import {SuperButton} from "f1-main/m1-ui/components/common";

export const NoCard = ({navigateBack}: NoCardPropsType) => {
  return <div className={s.wrapper} >
      <div className={s.inner}>
          <h1>No cards was found...</h1>
            <SuperButton onClick={navigateBack} className={"primaryButton"}>Go back</SuperButton>
      </div>
  </div>;
};

type NoCardPropsType = {
    navigateBack: () => void
}