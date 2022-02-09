import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import wpStyle from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css"
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperPasswordInput} from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";
import {useDispatch} from "react-redux";
import {RegisterTC} from "../../../f1-main/m2-bll/reducers/register/registerReducer";

export const Register = () => {

    const data = {
        email: "nya-admin@nya.nya",
        password: "1qazxcvBG"
    }

    const data2 = {
        email: "adminsrsgs@nya.nya",
        password: "1qazxcsdgsdgsdvBG"
    }


    const dispatch = useDispatch();
    const onclickHandler = () => {
        dispatch(RegisterTC(data2)
        )
    }

    return (
        <section>
            <WhitePaper>
                <h2 className={wpStyle.subtitle}>
                    Registration
                </h2>
                <button onClick={onclickHandler}>test button</button>
                <div>
                    <SuperInputText labelValue={"Email"}/>
                    <SuperPasswordInput/>
                </div>
                <ErrorSnackbar/>
            </WhitePaper>
        </section>
    )
}