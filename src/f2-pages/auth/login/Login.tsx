import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {SuperCheckbox} from "../../../f1-main/m1-ui/components/common/superCheckbox/SuperCheckbox";
import {LoginParamsType} from "../../../f1-main/m3-dal/api";
import {LoginTC} from "../../../f1-main/m2-bll/reducers/login/loginReducer";
import {Navigate} from "react-router-dom";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";
import {PendingStatusType} from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";

export const Login = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<RootAppStateType>(
        (state) => state.app.isLoggedIn
    );
    const errorMessage = useSelector<RootAppStateType>(
        (state) => state.app.errorMessage
    );
    const status = useSelector<RootAppStateType, PendingStatusType>(
        (state) => state.app.status
    )

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        onSubmit: (values) => {
            dispatch(LoginTC(values));
            formik.resetForm();
        },
        validate: (values) => {
            const errors: Partial<Omit<LoginParamsType, "captcha">> = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 5) {
                errors.email = "Invalid password";
            }
            return errors;
        },
    });

    if (isLoggedIn) {
        return <Navigate to="/profile"/>;
    }

    return (
        <>
            {
                // Spinner
                status === "loading"
                    ?
                    <div>loading...</div>
                    :
                    <section>
                        <form onSubmit={formik.handleSubmit}>
                            <SuperInputText {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email ? (
                                <div>{formik.errors.email}</div>
                            ) : null}

                            <SuperInputText {...formik.getFieldProps("password")} />
                            {formik.touched.password && formik.errors.password ? (
                                <div>{formik.touched.password && formik.errors.password}</div>
                            ) : null}

                            <SuperCheckbox
                                name="rememberMe"
                                onChange={formik.handleChange}
                                checked={formik.values.rememberMe}
                            />

                            <SuperButton type={"submit"}>Login</SuperButton>
                        </form>

                        {errorMessage ? <div>.{errorMessage}.</div> : null}
                    </section>
            }
        </>
    );
};
