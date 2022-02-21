import React from "react";
import Select, {Option} from "rc-select";

const children: any = [];
for (let i = 10; i < 36; i++) {
    children.push(
        <Option key={i} disabled={i === 10}>
            label{i}
        </Option>
    );
}
export const Test1 = () => {
    const state = {
        useAnim: 0,
        value: ["a10"],
    };

    const onChange = (value: any, options: any) => {
        console.log("onChange", value, options);

    };

    const onSelect = (...args: any) => {
        console.log(args);
    };

    const onDeselect = (...args: any) => {
        console.log(args);
    };



        return (
                <Select
                    className="rc-select"
                    value={state.value}
                    choiceTransitionName="rc-select-selection__choice-zoom"
                    style={{width: 500}}
                    allowClear
                    optionFilterProp="children"
                    optionLabelProp="children"
                    onSelect={onSelect}
                    onDeselect={onDeselect}
                    placeholder="please select"
                    onChange={onChange}
                    onFocus={() => console.log("focus")}
                >
                    {children}
                </Select>
        );
    }
