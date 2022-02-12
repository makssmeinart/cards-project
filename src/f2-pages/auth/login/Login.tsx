import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {SuperInputText} from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import {SuperButton} from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {SuperCheckbox} from "../../../f1-main/m1-ui/components/common/superCheckbox/SuperCheckbox";
import {LoginParamsType} from "../../../f1-main/m3-dal/api";
import {LoginTC} from "../../../f1-main/m2-bll/reducers/login/loginReducer";
import {Link, Navigate} from "react-router-dom";
import React from "react";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";
import {PendingStatusType} from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";
import {routes} from "../../../f1-main/m2-bll/routes/routes";
import {ErrorInput} from "../../../f1-main/m1-ui/components/common/errorInput/ErrorInput";
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import {Loading} from "../../../f1-main/m1-ui/components/common/loading/Loading";
import {SuperPasswordInput} from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";
import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import wpS from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css"


export const Login = () => {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector<RootAppStateType>(
        (state) => state.app.isLoggedIn
    );
    const status = useSelector<RootAppStateType, PendingStatusType>(
        (state) => state.app.status
    );


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
            const errors: Partial<Pick<LoginParamsType, "email" | "password">> = {};
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
                errors.password = "Invalid password";
            }
            return errors;
        },
    });

    if (isLoggedIn) {
        return <Navigate to={routes.profile}/>;
    }

    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section>
                    <WhitePaper>
                        <form onSubmit={formik.handleSubmit}>
                            <h2 className={wpS.subtitle}>Sign In</h2>
                            <SuperInputText labelValue={"Email"} type={"text"} {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email ? (
                                <ErrorInput error={formik.errors.email}/>
                            ) : <div style={{height: "21px"}}/>}
                            <SuperPasswordInput
                                value={formik.getFieldProps("password").value}
                                onChange={formik.getFieldProps("password").onChange}
                                name={formik.getFieldProps("password").name}
                                onBlur={formik.getFieldProps("password").onBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <ErrorInput error={formik.errors.password}/>
                            ) : <div style={{height: "21px"}}/>}

                            <div>
                                <div className={wpS.rememberMe}>
                                    <div>
                                        Remember me:
                                        <SuperCheckbox
                                            name="rememberMe"
                                            onChange={formik.handleChange}
                                            checked={formik.values.rememberMe}
                                        />
                                    </div>
                                    <Link className={wpS.forgot} to={routes.recoverPassword}>Forgot Password</Link>
                                </div>
                                <div>
                                    <SuperButton style={{marginBottom: "31px"}} className={"primaryButton"} type={"submit"}>Login</SuperButton>
                                </div>
                            </div>
                        </form>
                        <div>
                            <p className={wpS.dontHaveAccount}>Don’t have an account?</p>
                            <Link className={wpS.signUp} to={routes.register}>
                                Sign Up
                            </Link>
                        </div>
                    </WhitePaper>
                    <ErrorSnackbar/>
                </section>
            )}
        </>
    );
};
