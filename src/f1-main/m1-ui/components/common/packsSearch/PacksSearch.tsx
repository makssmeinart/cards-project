import s from "../table/cardsListTable.module.css";
import {SuperInputText} from "../superInput/SuperInput";
import {SuperButton} from "../superButton/SuperButton";
import React, {useCallback, useState} from "react";
import {
    addPackTC,
    inputChangeHandlerAC
} from "../../../../m2-bll/reducers/packsReducer/packsReducer";
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