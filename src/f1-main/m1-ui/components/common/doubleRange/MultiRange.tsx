import React, { useState} from "react";
//@ts-ignore
import MultiRangeSlider from "multi-range-slider-react";
import {useSelector} from "react-redux";
import {maxRangeSelector, minRangeSelector} from "../../../../m2-bll/selectors/selectAppStatus";

type PropsType = {
    min: number;
    max: number;
}

function MultiRange(props: PropsType) {
    const minRange = useSelector(minRangeSelector)
    const maxRange = useSelector(maxRangeSelector)
    const [minValue, set_minValue] = useState(minRange);
    const [maxValue, set_maxValue] = useState(maxRange);
    const handleInput = (e:any) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
    };

    return (

        <div className="App">
            <MultiRangeSlider
                debugger
                min={0}
                max={100}
                step={5}
                ruler={true}
                label={true}
                preventWheel={false}
                minValue={minValue}
                maxValue={maxValue}
                onInput={(e:any) => {
                    handleInput(e);
                }}
            />
        </div>
    );
}

export default MultiRange;