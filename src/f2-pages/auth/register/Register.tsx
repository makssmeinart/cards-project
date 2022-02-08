import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import wpStyle from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css"
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperPasswordInput} from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";

export const Register = () => {

    return (
        <section>
            <WhitePaper>
                <h2 className={wpStyle.subtitle}>
                    Sign In
                </h2>
                <div>
                    <SuperInputText labelValue={"Email"} />
                    <SuperPasswordInput />
                </div>
            </WhitePaper>
            <ErrorSnackbar />
        </section>
    )
}