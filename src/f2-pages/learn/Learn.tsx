import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardsType,
  fetchAllCardsTC,
  gradeCardTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import { getCardsSelector } from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { getRandomCard } from "../../f1-main/m4-utility/getRandomCard";
import {Card} from "./components/card/Card";
import s from "./Learn.module.css"
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";

export const Learn = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);
  const [first, setFirst] = useState(true);
  const [gradeValue, setGradeValue] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  const [currentCard, setCurrentCard] = useState<Partial<CardsType>>({
    answer: "",
    cardsPack_id: "",
    comments: "",
    grade: 1,
    question: "",
    rating: 0,
    shots: 0,
    user_id: "",
    _id: "617ff573d7b1030004090a20",
  });

  const nextCardHandler = (grade: number) => {
    setCurrentCard(getRandomCard(cards));
    dispatch(
      gradeCardTC(Number(grade), currentCard._id ? currentCard._id : "123")
    );
    setIsChecked(false)
  };

  useEffect(() => {
    if (first) {
      packId && dispatch(fetchAllCardsTC(packId));
      setFirst(false);
    }
    if (cards.length > 0) {
      setCurrentCard(getRandomCard(cards));
    }
  }, [cards]);


  return (
    <>
      <Header />
      <section className={s.wrapper}>
        <Card
            currentCard={currentCard}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            setGradeValue={setGradeValue}
            nextCardHandler={nextCardHandler}
        />
      </section>
    </>
  );
};
