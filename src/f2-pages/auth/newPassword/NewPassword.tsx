import React, {useState} from "react";
import {useFormik} from "formik";
import {LoginParamsType} from "../../../f1-main/m3-dal/api";
import {SuperPasswordInput} from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";
import {ErrorInput} from "../../../f1-main/m1-ui/components/common/errorInput/ErrorInput";
import {useParams} from "react-router-dom";
import {SuperButton} from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import {WhitePaper} from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import {setNewPasswordTC} from "../../../f1-main/m2-bll/reducers/newPassword/newPasswordReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';
import {ErrorSnackbar} from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import {Loading} from "../../../f1-main/m1-ui/components/common/loading/Loading";
import {RootAppStateType} from "../../../f1-main/m2-bll/store";
import {PendingStatusType} from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";


export const NewPassword = () => {
    const dispatch = useDispatch()
    const [nav, setNav] = useState<boolean>(false)
    const status = useSelector<RootAppStateType, PendingStatusType>(
        (state) => state.app.status
    );
    const {token} = useParams<"token">();
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        onSubmit: (values) => {
            if (token) {
                dispatch(setNewPasswordTC(values.password, token, setNav))
                console.log(values.password, token)
                formik.resetForm();
            }
        },
        validate: (values) => {
            const errors: Partial<Pick<LoginParamsType, "password">> = {};
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 7) {
                errors.password = "Invalid password";
            }
            return errors;
        },
    });
    const navigate = useNavigate();
    return (
        <>
            {status === "loading" ? (
                <Loading/>
            ) : (
                <section>
                    {nav ? navigate("/login") : null}
                    <WhitePaper>
                        <form onSubmit={formik.handleSubmit}>

                            <SuperPasswordInput
                                value={formik.getFieldProps("password").value}
                                onChange={formik.getFieldProps("password").onChange}
                                name={formik.getFieldProps("password").name}
                                onBlur={formik.getFieldProps("password").onBlur}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <ErrorInput error={formik.errors.password}/>
                            ) : null}

                            <SuperButton className={"primaryButton"} type={"submit"}>Set</SuperButton>

                        </form>
                        <ErrorSnackbar/>
                    </WhitePaper>
                </section>
            )}
        </>
    )
}