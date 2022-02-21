import packsS from "../table/packsListTable.module.css";
import {DoubleRange} from "../doubleRange/DoubleRange";
import React from "react";
import {sortedPackBtnAC} from "../../../../m2-bll/reducers/packsReducer/packsReducer";
import {useDispatch} from "react-redux";

export const Sidebar = React.memo(() => {
    const dispatch = useDispatch()
    // const [sortedPackBtn, setSortedPackBtn] = useState(false);

    // useEffect(() => {
    // }, [sortedPackBtn]);


    // const setMyPacks = useCallback(() => {
    //     debugger
    //     setSortedPackBtn(true);
    // }, [setSortedPackBtn])
    //
    // const setAllPacks = useCallback(() => {
    //     debugger
    //     setSortedPackBtn(false);
    // }, [sortedPackBtn])

    return (
        <aside className={packsS.sidebar}>
            <div className={packsS.showPacksCard}>
                <h2>Show pack cards</h2>
                <div className={packsS.buttonHolder}>
                    <button onClick={() => dispatch(sortedPackBtnAC(true))}>My</button>
                    <button onClick={() => dispatch(sortedPackBtnAC(false))}>All
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
