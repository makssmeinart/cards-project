import {SuperInputText} from "../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {SuperCheckbox} from "../../f1-main/m1-ui/components/common/superCheckbox/SuperCheckbox";

export const Test = () => {
    return (
        <section>
            <ul>
                <li>
                    <SuperInputText />
                </li>
                <li>
                    <SuperButton > Test Button</SuperButton>
                </li>
                <li>
                    <SuperCheckbox />
                </li>
            </ul>
        </section>
    )
}