import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import wpStyle from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css"
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperPasswordInput} from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";
import {useDispatch, useSelector} from "react-redux";
import {RegisterTC} from "../../../f1-main/m2-bll/reducers/register/registerReducer";
import {Navigate} from "react-router-dom";
import {routes} from "../../../f1-main/m2-bll/routes/routes";
import React, {useState} from "react";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";

export const Register = () => {

    // const error = useSelector<RootAppStateType, string | null>(
    //     (state) => state.app.errorMessage
    // );
    // const isLoggedIn = useSelector<RootAppStateType>(
    //     (state) => state.app.isLoggedIn
    // );

    const [isSuccessRegister, setIsSuccessRegister] = useState<boolean>(false)

    const data = {
        email: "nya-admin@nya.nya",
        password: "1qazxcvBG"
    }

    const data2 = {
        email: "adminsrsgs@nya.nya",
        password: "1qazxcsdgsdgsdvBG"
    }

    const data3 = {
        email: "adminsrsgfgfgs@nya.nya",
        password: "1qazxcsdgfgfgsdgsdvBG"
    }


    const dispatch = useDispatch();
    const onclickHandler = () => {
        dispatch(RegisterTC(data3, setIsSuccessRegister)
        )
    }

    if (isSuccessRegister) {
        return <Navigate to={routes.login} />;
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
            </WhitePaper>
            <ErrorSnackbar/>
        </section>
    )
}