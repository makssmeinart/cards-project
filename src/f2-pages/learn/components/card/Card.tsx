import { routes } from "../../../../f1-main/m2-bll/routes/routes";
import React, { useState } from "react";
import { CardsType } from "../../../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import { useNavigate } from "react-router-dom";
import SuperRadio from "../../../../f1-main/m1-ui/components/common/superRadio/SuperRadio";
import s from "./Card.module.css";
import { SuperButton } from "../../../../f1-main/m1-ui/components/common";

export const Card = ({
  currentCard,
  isChecked,
  setIsChecked,
  nextCardHandler,
}: CardPropsType) => {
  const navigate = useNavigate();

  const buttonValues = ["Don't know", "Sort of know", "Do know"];
  const [option, setOption] = useState("Don't know");

  let customOption =
    option === "Don't know" ? 1 : option === "Sort of know" ? 3 : 5;

  const handleNext = () => {
    setOption("Don't know");
    nextCardHandler(customOption);
  };

  return (
    <div className={s.card}>
      <div className={s.textWrapper}>
        <h2>Question:</h2>
        <p>{currentCard.question}</p>
        {currentCard.questionImg && !isChecked && (
          <img src={currentCard.questionImg} alt="Question Cover" />
        )}
      </div>
      {!isChecked && (
        <div className={s.buttonWrapper}>
          <SuperButton
            className={"primaryButton"}
            onClick={() => navigate(routes.packList)}
          >
            Cancel
          </SuperButton>
          <SuperButton
            className={"secondaryButton"}
            onClick={() => setIsChecked(!isChecked)}
          >
            Show Answer
          </SuperButton>
        </div>
      )}
      <div>
        {isChecked && (
          <div className={s.answer}>
            <div className={`${s.answerTextWrapper} ${s.textWrapper}`}>
              <h2>Answer:</h2>
              <p>{currentCard.answer}</p>
            </div>
            <div>
              <div className={s.radioWrapper}>
                <SuperRadio
                  value={option}
                  options={buttonValues}
                  onChangeOption={setOption}
                />
              </div>
              <div className={s.buttonWrapper}>
                <SuperButton
                  className={"primaryButton"}
                  onClick={() => setIsChecked(false)}
                >
                  Back
                </SuperButton>
                <SuperButton
                  className={"secondaryButton"}
                  onClick={() => handleNext()}
                >
                  Next
                </SuperButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// type
export type CardPropsType = {
  currentCard: Partial<CardsType>;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  nextCardHandler: (grade: number) => void;
  navigateBack: () => void;
};
