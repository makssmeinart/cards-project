import s from "../../../../f1-main/m1-ui/components/common/table/cardsListTable.module.css";
import {SuperInputText} from "../../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import React, {useCallback, useState} from "react";
import {
    addPackTC,
    inputChangeHandlerAC
} from "../../../../f1-main/m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch} from "react-redux";

export const PacksSearch = React.memo(() => {

    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState("");

    const searchInputByValue = useCallback(() => {
        dispatch(inputChangeHandlerAC(inputValue));
    }, [dispatch, inputValue, setInputValue])

    const addPackHandler = useCallback(() => {
        dispatch(addPackTC());
    }, [dispatch])

    console.log(inputValue)

    return (
        <div className={s.search}>
            <SuperInputText onEnter={searchInputByValue}
                            onChange={(e) => setInputValue(e.currentTarget.value)}/>

            <div className={s.searchButtonWrapper}>
                <SuperButton
                    className={"primaryButton"}
                    style={{width: "250px"}}
                    onClick={addPackHandler}
                >
                    Add new pack
                </SuperButton>
            </div>
        </div>
    )
})