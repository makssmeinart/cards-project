import {Navigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changeCardsValueAC,
    fetchCardsTC,
    addCardTC,
} from "../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {
    appStatusSelector,
    currentUserIdSelector,
    getCardsSelector,
    isLoggedInSelector,
    sortCardsValueSelector,
    userIdSelector
} from "../../f1-main/m2-bll/selectors/selectAppStatus";
import {Header} from "../../f1-main/m1-ui/components/common/header/Header";
import {routes} from "../../f1-main/m2-bll/routes/routes";
import {Loading} from "../../f1-main/m1-ui/components/common/loading/Loading";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";

export const CardsList = () => {
    const [gradeSortValue, setGradeSortValue] = useState<"0grade" | "1grade">("1grade")
    const gradeSortHandler = () => {
        if (gradeSortValue === "1grade") {
            setGradeSortValue(()=>"0grade")
        } else {
            setGradeSortValue(()=>"1grade")
        }
        dispatch(changeCardsValueAC(gradeSortValue))
    }

    const [questionSortValue, setQuestionSortValue] = useState<"0question" | "1question">("0question")
    const questionSortHandler = () => {
        if (questionSortValue === "0question") {
            setQuestionSortValue(()=>"1question")
        } else {
            setQuestionSortValue(()=>"0question")
        }
        dispatch(changeCardsValueAC(questionSortValue))
    }

    const [answerSortValue, setAnswerSortValue] = useState<"0answer" | "1answer">("0answer")
    const answerSortHandler = () => {
        if (answerSortValue === "0answer") {
            setAnswerSortValue(()=> "1answer")
        } else {
            setAnswerSortValue(()=> "0answer")
        }
        dispatch(changeCardsValueAC(answerSortValue))
    }

    const [updatedSortValue, setUpdatedSortValue] = useState<"0updated" | "1updated">("0updated")
    const updatedSortHandler = () => {
        if(updatedSortValue === "0updated") {
            setUpdatedSortValue(() => "1updated")
        }
        else {
            setUpdatedSortValue(() => "0updated")
        }
        dispatch(changeCardsValueAC(updatedSortValue))
    }

    const status = useSelector(appStatusSelector);
    const isLoggedIn = useSelector(isLoggedInSelector);
    const dispatch = useDispatch()
    const cards = useSelector(getCardsSelector)
    const {packId} = useParams()
    const myId = useSelector(userIdSelector)
    const currentUserId = useSelector(currentUserIdSelector)
    const sortCardsValue = useSelector(sortCardsValueSelector)


    const addCardHandler = () => {
         packId && dispatch(addCardTC(packId))
    }

    useEffect(() => {
        packId && dispatch(fetchCardsTC(packId))
    }, [packId, sortCardsValue])

    if (!isLoggedIn) {
        return <Navigate to={routes.login}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section>
                    <Header/>
                    <main >
                        <div>
                            {currentUserId === myId &&
                            <SuperButton onClick={addCardHandler}>Add new item</SuperButton>}

                            <ul >
                                <li onClick={questionSortHandler}>Question</li>
                                <li onClick={answerSortHandler}>Answer</li>
                                <li onClick={updatedSortHandler}>Last Updated</li>
                                <li onClick={gradeSortHandler}>Grade</li>
                                <li>Actions</li>
                            </ul>
                            <div>
                                {cards.map((c) => {
                                    return <div>Card List</div>
                                })}
                            </div>
                        </div>
                    </main>
                </section>
            )
            }
        </>
    )
}