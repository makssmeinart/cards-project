import s from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import {SuperInputText} from "../../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import React, {useCallback, useEffect, useState} from "react";
import {
    addPackTC,inputChangeHandlerAC,
} from "../../../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch} from "react-redux";
import {useDebounced} from "../../../../f1-main/m4-utility/debouncingHook";
import QuestionModalContainer
    from "../../../../f1-main/m1-ui/components/common/questionModal/QuestionModalContainer";
import InputModalContainer
    from "../../../../f1-main/m1-ui/components/common/inputModal/InputModalContainer";

export const PacksSearch = React.memo(() => {

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("");
    const inputValueDebounced = useDebounced(inputValue)

    useEffect(() => {
        dispatch(inputChangeHandlerAC(inputValueDebounced))
    }, [inputValueDebounced])

    const addPackHandler = useCallback(() => {
        dispatch(addPackTC("New Packaritooo"));
    }, [dispatch])

    return (
        <div className={s.search}>
            <SuperInputText
                onChange={e => setInputValue(e.currentTarget.value)}
                placeholder={"Search pack by name"}
            />

            <div className={s.searchButtonWrapper}>
                <InputModalContainer />
            </div>
        </div>
    )
})