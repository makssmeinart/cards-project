import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CardsType, fetchAllCardsTC, gradeCardTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import { getCardsSelector } from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {getRandomCard} from "../../f1-main/m4-utility/getRandomCard";

export const Learn = () => {
  const { packId } = useParams();
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);
  const [first, setFirst] = useState(true)

  const [currentCard, setCurrentCard] = useState<Partial<CardsType>>({
    answer: "",
    cardsPack_id: "",
    comments: "",
    grade: 0,
    question: "",
    rating: 0,
    shots: 0,
    user_id: "",
    _id: "617ff573d7b1030004090a20",
  })

  const onClickHandler  = () => {
    setCurrentCard(getRandomCard(cards))
  }
  // dispatch(gradeCardTC(1,currentCard._id ? currentCard._id : "123"))

  useEffect(() => {
    if(first) {
      packId && dispatch(fetchAllCardsTC(packId))
      setFirst(false)
    }
    // if(cards.length > 0) {
    //   setCurrentCard(getRandomCard(cards))
    // }
  }, [])

  return (
    <>
      {JSON.stringify(currentCard.question)}
      <SuperButton onClick={onClickHandler}>+++</SuperButton>
    </>
  );
};
















// import React, {useEffect, useState} from 'react';
// import {CardType, getCardsTC, updateGradeTC} from '../../bll/reducers/cards-reducer';
// import {useDispatch, useSelector} from 'react-redux';
// import {NavLink, useParams} from 'react-router-dom';
// import {AppRootState} from '../../bll/store';
// import SuperButton from '../06_common/c2-SuperButton/SuperButton';
// import t from './TrainContainer.module.scss';
// import {PATH} from '../05_routes/Routes';
// import {RequestStatusType} from '../../bll/reducers/app-reducer';
// import Loader from '../06_common/c5-Loader/Loader';
//
// const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];
//
// const getCardRandom = (cards: CardType[]) => {
//   const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
//   const rand = Math.random() * sum;
//   const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
//         const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
//         return {sum: newSum, id: newSum < rand ? i : acc.id}
//       }
//       , {sum: 0, id: -1});
//
//   return cards[res.id + 1];
// }
//
//
// export const Train = () => {
//   const dispatch = useDispatch();
//   const [activeGrade, setActiveGrade] = useState<string | null>(null);
//   const status = useSelector<AppRootState, RequestStatusType>(state => state.cards.trainStatus)
//   const statusCards = useSelector<AppRootState, RequestStatusType>(state => state.cards.status)
//
//   const [first, setFirst] = useState<boolean>(true);
//
//   const [isChecked, setIsChecked] = useState<boolean>(false);
//   const [grade, setGrade] = useState<number>(0)
//   const cards = useSelector((store: AppRootState) => store.cards.cards);
//   const {id} = useParams<{ id: string }>()
//   const [card, setCard] = useState<CardType>({
//     answer: '',
//     question: '',
//     cardsPack_id: '',
//     grade: 0,
//     rating: 0,
//     shots: 0,
//     type: '',
//     user_id: '',
//     created: '',
//     updated: '',
//     __v: 0,
//     _id: '',
//   });
//
//   useEffect(() => {
//     if (first) {
//       dispatch(getCardsTC(id))
//       setFirst(false)
//     }
//
//     if (cards.length > 0) {
//       setCard(getCardRandom(cards));
//     }
//
//   }, [dispatch, first, cards])
//
//   const setCheckedMode = () => setIsChecked(true)
//
//   const setGradeToCard = (grade: number, event?: any) => {
//     setGrade(grade)
//   }
//
//   const onNextHandler = () => {
//     dispatch(updateGradeTC(card._id, grade))
//     setIsChecked(false)
//     setActiveGrade(null)
//   }
//
//   return (
//       <div className={t.trainBox}>
//         {statusCards === 'loading' && <Loader />}
//         {status === 'loading' && <Loader/>}
//         {
//           !cards.length
//               ? <>
//                 <NavLink to={PATH.PACKS} className={t.backLink}>
//                   <SuperButton className={t.backBtn}>Packs</SuperButton>
//                 </NavLink>
//                 {statusCards === 'loading' ? null :
//                     <div className={t.emptyMessage}>Oops, it's empty. Please choose another pack..</div>}
//               </>
//               :
//               <>
//                 <NavLink to={PATH.PACKS} className={t.backLink}>
//                   <SuperButton className={t.backBtn}>Packs</SuperButton>
//                 </NavLink>
//                 <div className={t.question}>{card && card.question}</div>
//                 <div>
//                   <SuperButton className={t.checkBtn} onClick={setCheckedMode}
//                                disabled={status === 'loading'}>check</SuperButton>
//                 </div>
//
//                 {isChecked && (
//                     <>
//                       <div className={t.answer}>{card && card.answer}</div>
//
//                       <div className={t.answerBoxBtn}>
//                         {grades.map((g, i) => (
//                             <SuperButton data-tag={i + 1}
//                                          className={`${t.answerBtn} ${activeGrade === g ? t.answerBtnActive : null}`}
//                                          key={'grade-' + i}
//                                          onClick={(event: any) => {
//                                            setGradeToCard(i + 1, event)
//                                            setActiveGrade(g)
//                                          }
//                                          }>{g}</SuperButton>))
//                         }
//                       </div>
//
//                       <div><SuperButton className={t.nextBtn} onClick={onNextHandler}>next</SuperButton></div>
//                     </>
//                 )}
//               </>
//         }
//       </div>
//   );
// }
