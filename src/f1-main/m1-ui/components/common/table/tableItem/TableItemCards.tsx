import tableS from "../table.module.css";
import React from "react";
import {CardsType} from "../../../../../m2-bll/reducers/cardsReducer/cardsReducer";

export const TableItemCards = ({card}: TableItemType) => {


    return (
        <div className={`${tableS.tableItem}`} key={card._id}>
            <div>
                {card.question}
            </div>
            <div>
                {card.answer}
            </div>
            <div>
                {card.updated}
            </div>
            <div>
                {card.grade}
            </div>
            {/*<div>*/}
            {/*    {userId === card.user_id ? (*/}
            {/*        <>*/}
            {/*            <SuperButton*/}
            {/*                onClick={() => deletePack(pack._id)}>Delete</SuperButton>*/}
            {/*            <SuperButton*/}
            {/*                onClick={() => editPack(pack._id, "New name test")}>Edit</SuperButton>*/}
            {/*        </>*/}
            {/*    ) : null}*/}
            {/*    <SuperButton>Learn</SuperButton>*/}
            {/*</div>*/}
        </div>
    );
}

// Types

type TableItemType = {
    card: CardsType,
}