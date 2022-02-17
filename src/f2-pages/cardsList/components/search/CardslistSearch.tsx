import s
    from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import {SuperInputText} from "../../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import React, {useState} from "react";
import {
    addCardTC,
    changeSearchByCardsQuestionValue
} from "../../../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    currentUserIdSelector,
    userIdSelector
} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import {useParams} from "react-router-dom";

export const CardslistSearch = () => {
    const dispatch = useDispatch()
    const [searchCardsInput, setSearchCardsInput] = useState("")
    const currentUserId = useSelector(currentUserIdSelector);
    const myId = useSelector(userIdSelector);
    const {packId} = useParams();

    const searchCardsByValue = () => {
        dispatch(changeSearchByCardsQuestionValue(searchCardsInput))
    }

    const addCardHandler = () => {
        packId && dispatch(addCardTC(packId));
    }

    return (
        <div className={s.search}>
            <SuperInputText onEnter={searchCardsByValue}
                            onChange={(e) => setSearchCardsInput(e.currentTarget.value)}/>

            {currentUserId === myId && (
                <div className={s.searchButtonWrapper}>
                    <SuperButton
                        className={"primaryButton"}
                        style={{width: "250px"}}
                        onClick={addCardHandler}
                    >
                        Add new pack
                    </SuperButton>
                </div>
            )}
        </div>
    )
}