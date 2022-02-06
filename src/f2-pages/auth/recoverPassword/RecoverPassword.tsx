import {Link} from "react-router-dom";
import {routes} from "../../../f1-main/m2-bll/routes/routes";
import {useDispatch, useSelector} from "react-redux";
import {recoverPassword} from "../../../f1-main/m2-bll/reducers/recoverPassword/recoverPassword";
import {useState} from "react";
import {useFormik} from "formik";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {PendingStatusType} from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";

export const RecoverPassword = () => {
    const status = useSelector<RootAppStateType, PendingStatusType>(state => state.app.status)
    const [emailChecked, setEmailChecked] = useState(true)
    const dispatch = useDispatch()

    const recoverPasswordCallback = (values: RecoverPasswordFormValues) => {
        dispatch(recoverPassword(values, setEmailChecked))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: {email?: string} = {}
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
                    <div>Loading</div>
                    :
                    <section>
                        {
                            emailChecked
                                ?
                                <>
                                    <form onSubmit={formik.handleSubmit}>
                                        <SuperInputText {...formik.getFieldProps("email")} />
                                        {formik.touched.email && formik.errors.email ? (
                                            <div >{formik.errors.email}</div>
                                        ) : null}

                                        <SuperButton type={"submit"}>Login</SuperButton>
                                    </form>

                                    <Link to={routes.login}>Try logging in</Link>
                                </>
                                :
                                <h1>Check your email</h1>
                        }
                        {/* Error Snackbar */}
                        <ErrorSnackbar />
                    </section>
            }
        </>
    )
}

// Types

export type RecoverPasswordFormValues = {
    email: string
}