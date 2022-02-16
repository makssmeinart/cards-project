import packsS from "../table/packsListTable.module.css";
import {DoubleRange} from "../doubleRange/DoubleRange";
import React, {useCallback, useEffect, useState} from "react";
import {sortedPackBtnAC} from "../../../../m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch} from "react-redux";

export const Sidebar = React.memo(({minRange, maxRange}: SidebarPropsType) => {
    const dispatch = useDispatch()
    const [sortedPackBtn, setSortedPackBtn] = useState(false);

    useEffect(() => {
        dispatch(sortedPackBtnAC(sortedPackBtn));
    }, [sortedPackBtn]);


    const setMyPacks = useCallback(() => {
        setSortedPackBtn(true);
    }, [setSortedPackBtn])

    const setAllPacks = useCallback(() => {
        setSortedPackBtn(false);
    }, [sortedPackBtn])

    return (
        <aside className={packsS.sidebar}>
            <div className={packsS.showPacksCard}>
                <h2>Show pack cards</h2>
                <div className={packsS.buttonHolder}>
                    <button onClick={setMyPacks}>My</button>
                    <button onClick={setAllPacks}>All
                    </button>
                </div>
            </div>
            <div className={packsS.showNumberOfCards}>
                <h3>Show number of cards</h3>
                <div>
                    <DoubleRange min={minRange}
                                 max={maxRange}/>
                </div>
            </div>
        </aside>
    )
})

// types

type SidebarPropsType = {
    minRange: number
    maxRange: number
}