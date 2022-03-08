import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardsType,
  fetchAllCardsTC,
  gradeCardTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {
  appStatusSelector,
  getCardsSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { Card } from "./components/card/Card";
import s from "./Learn.module.css";
import { Header, Loading } from "../../f1-main/m1-ui/components/common";
import { NoCard } from "./components/noCard/NoCard";
import {getRandomCard} from "f1-main/m4-utility";

export const Learn = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(appStatusSelector);
  const cards = useSelector(getCardsSelector);
  const [first, setFirst] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  const [currentCard, setCurrentCard] = useState<Partial<CardsType>>({});

  const navigateBack = () => navigate(-1);

  const nextCardHandler = (grade: number) => {
    setCurrentCard(getRandomCard(cards));
    dispatch(
      gradeCardTC(Number(grade), currentCard._id ? currentCard._id : "123")
    );
    setIsChecked(false);
  };

  useEffect(() => {
    if (first) {
      packId && dispatch(fetchAllCardsTC(packId));
      setFirst(false);
    }
    if (cards.length > 0) {
      setCurrentCard(getRandomCard(cards));
    }
  }, [cards, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <section className={s.wrapper}>
        {!cards.length ? (
          <NoCard navigateBack={navigateBack} />
        ) : (
          <Card
            currentCard={currentCard}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            nextCardHandler={nextCardHandler}
            navigateBack={navigateBack}
          />
        )}
      </section>
    </>
  );
};
