import {Link} from "react-router-dom";
import {routes} from "../../../f1-main/m2-bll/routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {recoverPassword} from "../../../f1-main/m2-bll/reducers/recoverPassword/recoverPassword";
import React, {useState} from "react";
import {useFormik} from "formik";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {PendingStatusType} from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import {Loading} from "../../../f1-main/m1-ui/components/common/loading/Loading";
import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import wpS from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css"
import {ErrorInput} from "../../../f1-main/m1-ui/components/common/errorInput/ErrorInput";
import sendMessageIcon from "../../../f3-assets/images/icons/sentMessageIcon.png"

// console.log

export const RecoverPassword = () => {
    const status = useSelector<RootAppStateType, PendingStatusType>(
        (state) => state.app.status
    );
    const [emailChecked, setEmailChecked] = useState(true);
    const dispatch = useDispatch();

    const recoverPasswordCallback = (values: RecoverPasswordFormValues) => {
        dispatch(recoverPassword(values, setEmailChecked));
    };

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: { email?: string } = {}
            if (!values.email) {
                errors.email = 'Email is required!';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values, {resetForm}) => {
            dispatch(recoverPasswordCallback(values))
            resetForm()
        },
    });

    return (
        <>
            {
                // If page is loading load the spinner
                status === "loading"
                    ?
                    <Loading/>
                    :
                    <section>
                        {
                            emailChecked
                                ?
                                <>
                                    <WhitePaper>
                                        <h2 className={wpS.subtitle}>
                                            Sign Up
                                        </h2>
                                        <form onSubmit={formik.handleSubmit}>
                                            <SuperInputText labelValue={"Email"} {...formik.getFieldProps("email")} />
                                            {formik.touched.email && formik.errors.email ? (
                                                <ErrorInput error={formik.errors.email} />
                                            ) : <div style={{height: "21px"}}/>}
                                            <p className={`${wpS.dontHaveAccount} ${wpS.marginLeft} ${wpS.marginBottomLarge}`}>Enter your email address and we will send you further instructions </p>
                                            <SuperButton className={"primaryButton"} type={"submit"}>Login</SuperButton>
                                        </form>
                                        <p className={`${wpS.dontHaveAccount} ${wpS.marginYSmall}`}>Don’t have an account?</p>

                                        <Link to={routes.register} className={wpS.signUp}>Sign Up.</Link>
                                    </WhitePaper>

                                </>
                                :
                                <WhitePaper>
                                    <img className={wpS.messageSendIcon} src={sendMessageIcon} alt="Message sent icon"/>
                                    <h2 className={wpS.subtitle}>Check Email</h2>
                                    <p className={`${wpS.dontHaveAccount} ${wpS.marginYSmall}`}>We’ve sent an Email with instructions to example@mail.com</p>
                                </WhitePaper>
                        }
                        <ErrorSnackbar/>
                    </section>
            }
        </>
    )
}

// Types

export type RecoverPasswordFormValues = {
    email: string
}