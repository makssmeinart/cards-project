import s
    from "../../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import {SuperButton} from "../../../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import React from "react";
import {
    CardsType,
    deleteCardTC, editCardTC
} from "../../../../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    currentUserIdSelector,
    userIdSelector
} from "../../../../../f1-main/m2-bll/selectors/selectAppStatus";
import {useParams} from "react-router-dom";

export const TableItem = ({card}: TableItemPropsType) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector(currentUserIdSelector)
    const myId = useSelector(userIdSelector);
    const updateDate = card.updated.slice(0, 10)
    const {packId} = useParams();

    const deleteCardHandler = (cardId: string) => {
        packId && dispatch(deleteCardTC(packId, cardId))
    }

    const editCardHandler = (idCard: string, newQuestion: string) => {
        packId && dispatch(editCardTC(idCard, newQuestion, packId));
    }

    return (
        <div className={s.items}>
            <div
                className={s.item}>{card.question}</div>
            <div
                className={s.item}>{card.answer}</div>
            <div
                className={s.item}>{updateDate}</div>
            <div
                className={s.item}>{card.grade}</div>
            <div className={s.item}>
                <div className={s.buttonHolder}>
                    {currentUserId === myId && (
                        <>
                            <SuperButton
                                onClick={() => deleteCardHandler(card._id)}
                                className={"miniDeleteButton"}>
                                Delete
                            </SuperButton>
                            <SuperButton
                                className={"miniCommonButton"}
                                onClick={() =>
                                    editCardHandler(card._id, "editCARD")
                                }
                            >
                                Edit
                            </SuperButton>
                        </>
                    )}
                    <SuperButton
                        onClick={() => alert(" Zdarova Ignat naoj")}
                        className={"miniCommonButton"}>
                        Learn
                    </SuperButton>
                </div>
            </div>
        </div>
    )
}

// Types

type TableItemPropsType = {
    card: CardsType
}