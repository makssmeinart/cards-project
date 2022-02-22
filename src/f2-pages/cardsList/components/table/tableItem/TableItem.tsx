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
import {
    fireDeleteCardModal,
    fireEditCardModal
} from "../../../../../f1-main/m4-utility/modal";

export const TableItem = ({card}: TableItemPropsType) => {
    const dispatch = useDispatch()
    const currentUserId = useSelector(currentUserIdSelector)
    const myId = useSelector(userIdSelector);
    const updateDate = card.updated.slice(0, 10)
    const {packId} = useParams();
    const currentPackId = packId ? packId : ""

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
                                onClick={() => fireDeleteCardModal(currentPackId, card._id, dispatch)}
                                className={"miniDeleteButton"}>
                                Delete
                            </SuperButton>
                            <SuperButton
                                className={"miniCommonButton"}
                                onClick={() =>
                                    fireEditCardModal(card._id,currentPackId, dispatch )
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