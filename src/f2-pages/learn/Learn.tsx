import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardsType, fetchAllCardsTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import { getCardsSelector } from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

export const Learn = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);

  const getCardRandom = (cards: CardsType[]) => {
    const sum = cards.reduce(
      (acc, card) => acc + (6 - card.grade) * (6 - card.grade),
      0
    );
    const rand = Math.random() * sum;
    const res = cards.reduce(
      (acc: { sum: number; id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id };
      },
      { sum: 0, id: -1 }
    );

    return cards[res.id + 1];
  };
  const [first, setFirst] = useState<boolean>(true);

  const [currentCard, setCurrentCard] = useState<Partial<CardsType>>({
    answer: "",
    cardsPack_id: "",
    comments: "",
    grade: 0,
    question: "",
    rating: 0,
    shots: 0,
    user_id: "",
    _id: "",
  })

  const onClickHandler  = () => {
    setCurrentCard(getCardRandom(cards))
  }
  const btnValue = [1,2,3,4,5]

  useEffect(() => {
    if (first) {
      packId && dispatch(fetchAllCardsTC(packId));
      setFirst(false)
    }
    if (cards.length > 0) {
      setCurrentCard(getCardRandom(cards));
    }

  }, [dispatch, first, cards])

  const [value, setValue] = useState(1);


  return (
    <>


      {/*{JSON.stringify(currentCard.question)}*/}
      {btnValue.map(o=> {
        <input value={o} type="radio">{o}</input>
      })}


      {/*<SuperButton onClick={onClickHandler}>+++</SuperButton>*/}
    </>
  );
};