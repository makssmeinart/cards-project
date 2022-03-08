import s
    from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import React, {useEffect, useState} from "react";
import {
    changeSearchByCardsQuestionValue
} from "../../../../f1-main/m2-bll/reducers/cardsReducer/cardsReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    currentUserIdSelector,
    userIdSelector
} from "../../../../f1-main/m2-bll/selectors/selectAppStatus";
import {useParams} from "react-router-dom";
import {
    SuperButton,
    SuperInputText
} from "f1-main/m1-ui/components/common";
import {fireAddCardModal, useDebounced} from "f1-main/m4-utility";

export const CardslistSearch = () => {
    const dispatch = useDispatch()
    const [searchCardsInput, setSearchCardsInput] = useState("")
    const searchCardsInputDebounced = useDebounced(searchCardsInput)
    const currentUserId = useSelector(currentUserIdSelector);
    const myId = useSelector(userIdSelector);
    const {packId} = useParams();
    const currentPackId = packId !== undefined ? packId : ""

    useEffect(() => {
        dispatch(changeSearchByCardsQuestionValue(searchCardsInputDebounced))
    }, [searchCardsInputDebounced])

    return (
        <div className={s.search}>
            <SuperInputText
                onChange={(e) => setSearchCardsInput(e.currentTarget.value)}
                placeholder={"Search by card question"}
            />

            {currentUserId === myId && (
                <div className={s.searchButtonWrapper}>
                    <SuperButton
                        className={"primaryButton"}
                        style={{width: "250px"}}
                        onClick={() => fireAddCardModal(currentPackId, dispatch)}
                    >
                        Add new pack
                    </SuperButton>
                </div>
            )}
        </div>
    )
}