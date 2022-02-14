import tableS from "../table.module.css";
import React from "react";
import {CardsType} from "../../../../../m2-bll/reducers/cardsReducer/cardsReducer";
import {useSelector} from "react-redux";
import {RootAppStateType} from "../../../../../m2-bll/store";
import {SuperButton} from "../../superButton/SuperButton";

export const TableItemCards = ({card}: TableItemType) => {

    const updatedDate = card.updated.slice(0, 10)
    const userId = useSelector<RootAppStateType>(state => state.login._id)

    return (
        <div className={`${tableS.tableItem}`} key={card._id}>
            <div>
                {card.question}
            </div>
            <div>
                {card.answer}
            </div>
            <div>
                {updatedDate}
            </div>
            <div>
                {card.grade}
            </div>
            <div>
                {userId === card.user_id ? (
                    <>
                        <SuperButton
                            onClick={() => alert("Deleted")}>Delete</SuperButton>
                        <SuperButton
                            onClick={() => alert("Edited")}>Edit</SuperButton>
                    </>
                ) : null}
                <SuperButton onClick={() => alert("Learning naooi")}>Learn</SuperButton>
            </div>
        </div>
    );
}

// Types

type TableItemType = {
    card: CardsType,
}