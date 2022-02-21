import s
    from "../../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React, {useCallback, useState} from "react";
import {changeCardsValueAC} from "../../../../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {useDispatch} from "react-redux";

export const CardslistTableHeader = () => {

    const dispatch = useDispatch()

    const [gradeSortValue, setGradeSortValue] = useState
    <"0grade" | "1grade">("1grade")
    const [questionSortValue, setQuestionSortValue] = useState
    <"0question" | "1question">("0question")
    const [answerSortValue, setAnswerSortValue] = useState
    <"0answer" | "1answer">("0answer")
    const [updatedSortValue, setUpdatedSortValue] = useState
    <"0updated" | "1updated">("0updated")

    const gradeSortHandler = () => {
        if (gradeSortValue === "1grade") {
            setGradeSortValue(() => "0grade");
        } else {
            setGradeSortValue(() => "1grade");
        }
        dispatch(changeCardsValueAC(gradeSortValue));
    };

    const questionSortHandler = useCallback(() => {
        if (questionSortValue === "0question") {
            setQuestionSortValue(() => "1question");
        } else {
            setQuestionSortValue(() => "0question");
        }
        dispatch(changeCardsValueAC(questionSortValue));
    },[dispatch, questionSortValue])

    const answerSortHandler = useCallback(() => {
        if (answerSortValue === "0answer") {
            setAnswerSortValue(() => "1answer");
        } else {
            setAnswerSortValue(() => "0answer");
        }
        dispatch(changeCardsValueAC(answerSortValue));
    }, [dispatch, answerSortValue])

    const updatedSortHandler = useCallback(() => {
        if (updatedSortValue === "0updated") {
            setUpdatedSortValue(() => "1updated");
        } else {
            setUpdatedSortValue(() => "0updated");
        }
        dispatch(changeCardsValueAC(updatedSortValue));
    }, [dispatch, updatedSortValue])

    return (
        <div className={s.tableHeaderWrapper}>
            <div className={s.tableHeader}>
                <div className={s.tableLine}
                     onClick={questionSortHandler}>
                    Question
                </div>
                <div className={s.tableLine}
                     onClick={answerSortHandler}>
                    Answer
                </div>
                <div className={s.tableLine}
                     onClick={updatedSortHandler}>
                    Last Updated
                </div>
                <div className={s.tableLine}
                     onClick={gradeSortHandler}>
                    Grade
                </div>
                <div className={s.tableLine}>Actions
                </div>
            </div>
        </div>
    )
}