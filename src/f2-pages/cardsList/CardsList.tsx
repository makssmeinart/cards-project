import { Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCardsValueAC,
  fetchCardsTC,
  addCardTC, changeSearchByCardsQuestionValue, deleteCardTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {
  appStatusSelector,
  currentUserIdSelector,
  getCardsSelector,
  isLoggedInSelector, searchByCardsQuestionSelector,
  sortCardsValueSelector,
  userIdSelector,
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import { Header } from "../../f1-main/m1-ui/components/common/header/Header";
import { routes } from "../../f1-main/m2-bll/routes/routes";
import { Loading } from "../../f1-main/m1-ui/components/common/loading/Loading";
import { SuperButton } from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import s from "../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import { SuperInputText } from "../../f1-main/m1-ui/components/common/superInput/SuperInput";

export const CardsList = () => {
  // UseSelectros
  const status = useSelector(appStatusSelector);
  const isLoggedIn = useSelector(isLoggedInSelector);
  const dispatch = useDispatch();
  const cards = useSelector(getCardsSelector);
  const { packId } = useParams();
  const myId = useSelector(userIdSelector);
  const currentUserId = useSelector(currentUserIdSelector);
  const sortCardsValue = useSelector(sortCardsValueSelector);
  const searchByCardsQuestion = useSelector(searchByCardsQuestionSelector)

  const [searchCardsInput, setSearchCardsInput] = useState("")

  const [gradeSortValue, setGradeSortValue] = useState<"0grade" | "1grade">(
    "1grade"
  );
  // Sort
  const gradeSortHandler = () => {
    if (gradeSortValue === "1grade") {
      setGradeSortValue(() => "0grade");
    } else {
      setGradeSortValue(() => "1grade");
    }
    dispatch(changeCardsValueAC(gradeSortValue));
  };

  const [questionSortValue, setQuestionSortValue] = useState<
    "0question" | "1question"
  >("0question");
  const questionSortHandler = () => {
    if (questionSortValue === "0question") {
      setQuestionSortValue(() => "1question");
    } else {
      setQuestionSortValue(() => "0question");
    }
    dispatch(changeCardsValueAC(questionSortValue));
  };

  const [answerSortValue, setAnswerSortValue] = useState<"0answer" | "1answer">(
    "0answer"
  );
  const answerSortHandler = () => {
    if (answerSortValue === "0answer") {
      setAnswerSortValue(() => "1answer");
    } else {
      setAnswerSortValue(() => "0answer");
    }
    dispatch(changeCardsValueAC(answerSortValue));
  };

  const [updatedSortValue, setUpdatedSortValue] = useState<
    "0updated" | "1updated"
  >("0updated");
  const updatedSortHandler = () => {
    if (updatedSortValue === "0updated") {
      setUpdatedSortValue(() => "1updated");
    } else {
      setUpdatedSortValue(() => "0updated");
    }
    dispatch(changeCardsValueAC(updatedSortValue));
  };

  const searchCardsByValue = () => {
    dispatch(changeSearchByCardsQuestionValue(searchCardsInput))
  }

  const addCardHandler = () => {
    packId && dispatch(addCardTC(packId));
  };

  const deleteCardHandler = (cardId: string) => {
    packId && dispatch(deleteCardTC(packId, cardId))
  }

  useEffect(() => {
    packId && dispatch(fetchCardsTC(packId));
  }, [packId, sortCardsValue, searchByCardsQuestion]);

  if (!isLoggedIn) {
    return <Navigate to={routes.login} />;
  }

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <section>
          <Header />

          <main className={s.content}>
            <div className={s.wrapper}>
              <div className={s.nameAndBack}>
                <div>Strelka</div>
                <h1>PackNAME</h1>
              </div>

              <div className={s.search}>
                <SuperInputText onEnter={searchCardsByValue} onChange={(e) => setSearchCardsInput(e.currentTarget.value)} />

                {currentUserId === myId && (
                  <div className={s.searchButtonWrapper}>
                    <SuperButton
                      className={"primaryButton"}
                      style={{ width: "250px" }}
                      onClick={addCardHandler}
                    >
                      Add new pack
                    </SuperButton>
                  </div>
                )}
              </div>

              <div className={s.tableContainer}>
                <div className={s.tableHeaderWrapper}>
                  <div className={s.tableHeader}>
                    <div className={s.tableLine} onClick={questionSortHandler}>
                      Question
                    </div>
                    <div className={s.tableLine} onClick={answerSortHandler}>
                      Answer
                    </div>
                    <div className={s.tableLine} onClick={updatedSortHandler}>
                      Last Updated
                    </div>
                    <div className={s.tableLine} onClick={gradeSortHandler}>
                      Grade
                    </div>
                    <div className={s.tableLine}>Actions</div>
                  </div>
                </div>

                {cards.map((c) => {
                  const updateDate = c.updated.slice(0,10)
                  return (
                    <div className={s.items}>
                      <div className={s.item}>{c.question}</div>
                      <div className={s.item}>{c.answer}</div>
                      <div className={s.item}>{updateDate}</div>
                      <div className={s.item}>{c.grade}</div>
                      <div className={s.item}>
                        <div className={s.buttonHolder}>
                          <SuperButton onClick={() => deleteCardHandler(c._id)} className={"miniDeleteButton"}>
                            Delete
                          </SuperButton>
                          <SuperButton className={"miniCommonButton"}>
                            Edit
                          </SuperButton>
                          <SuperButton className={"miniCommonButton"}>
                            Learn
                          </SuperButton>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={s.pagination}>PAGINATION</div>
            </div>
          </main>
        </section>
      )}
    </>
  );
};
