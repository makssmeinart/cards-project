import packsS from "../table/packsListTable.module.css";
import {DoubleRange} from "../doubleRange/DoubleRange";
import React from "react";
import {sortedPackBtnAC} from "../../../../m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch, useSelector} from "react-redux";
import {sortedPackValueSelector} from "../../../../m2-bll/selectors/selectAppStatus";

export const Sidebar = React.memo(() => {
    const dispatch = useDispatch()
    const sortedPackButtonValue = useSelector(sortedPackValueSelector)

    const customStyle = sortedPackButtonValue ? {backgroundColor: "#1b1b1b", color: "white"} : {backgroundColor: "white", color: "#1b1b1b"}
    const customStyle2 = sortedPackButtonValue ? {backgroundColor: "white", color: "#1b1b1b"} :  {backgroundColor: "#1b1b1b", color: "white"}
    ;
    return (
        <aside className={packsS.sidebar}>
            <div className={packsS.showPacksCard}>
                <h2>Show pack cards</h2>
                <div className={packsS.buttonHolder}>
                    <button style={customStyle} onClick={() => dispatch(sortedPackBtnAC(true))}>My</button>
                    <button style={customStyle2} onClick={() => dispatch(sortedPackBtnAC(false))}>All
                    </button>
                </div>
            </div>
            <div className={packsS.showNumberOfCards}>
                <h3>Show number of cards</h3>
                <div>
                    <DoubleRange/>
                </div>
            </div>
        </aside>
    )
})
