import { WhitePaper } from "../../../f1-main/m1-ui/components/common/whitePaper/WhitePaper";
import { ErrorSnackbar } from "../../../f1-main/m1-ui/components/common/errorSnackbar/ErrorSnackbar";
import wpStyle from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css";
import { SuperInputText } from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import { SuperPasswordInput } from "../../../f1-main/m1-ui/components/common/superPasswordInput/SuperPasswordInput";
import { useDispatch } from "react-redux";
import { RegisterTC } from "../../../f1-main/m2-bll/reducers/register/registerReducer";
import { Link, Navigate } from "react-router-dom";
import { routes } from "../../../f1-main/m2-bll/routes/routes";
import React, { useState } from "react";
import { useFormik } from "formik";
import { SuperButton } from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import { ErrorInput } from "../../../f1-main/m1-ui/components/common/errorInput/ErrorInput";
import wpS from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css";

export const Register = () => {
  const [isSuccessRegister, setIsSuccessRegister] = useState<boolean>(false);

  const dispatch = useDispatch();

  type FormikErrorType = {
    email?: string;
    password?: string;
    passwordRepeat?: string;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    onSubmit: (values) => {
      const { passwordRepeat, ...newValues } = values;
      dispatch(RegisterTC(newValues, setIsSuccessRegister));
      formik.resetForm();
    },
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 7) {
        errors.password = "Invalid password";
      }
      if (!values.password) {
        errors.passwordRepeat = "Required";
      } else if (values.passwordRepeat.length < 7) {
        errors.passwordRepeat = "Invalid password";
      }
      if (values.password !== values.passwordRepeat) {
        errors.passwordRepeat =
          "Your password and confirmation password do not match";
      }
      return errors;
    },
  });

  if (isSuccessRegister) {
    return <Navigate to={routes.login} />;
  }

  return (
    <section>
      <WhitePaper>
        <h2 className={wpStyle.subtitle}>Registration</h2>
        <form onSubmit={formik.handleSubmit}>
          <SuperInputText
            labelValue={"Email"}
            type={"text"}
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <ErrorInput error={formik.errors.email} />
          ) : (
            <div style={{ height: "21px" }} />
          )}
          <SuperPasswordInput
            value={formik.getFieldProps("password").value}
            onChange={formik.getFieldProps("password").onChange}
            name={formik.getFieldProps("password").name}
            onBlur={formik.getFieldProps("password").onBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <ErrorInput error={formik.errors.password} />
          ) : (
            <div style={{ height: "21px" }} />
          )}

          <SuperPasswordInput
            value={formik.getFieldProps("passwordRepeat").value}
            onChange={formik.getFieldProps("passwordRepeat").onChange}
            name={formik.getFieldProps("passwordRepeat").name}
            onBlur={formik.getFieldProps("passwordRepeat").onBlur}
          />
          {formik.touched.passwordRepeat && formik.errors.passwordRepeat ? (
            <ErrorInput error={formik.errors.passwordRepeat} />
          ) : (
            <div style={{ height: "21px" }} />
          )}
          <SuperButton
            style={{ marginTop: "1rem" }}
            className={"primaryButton"}
            type={"submit"}
          >
            Login
          </SuperButton>
          <p className={`${wpS.dontHaveAccount} ${wpS.marginYSmall}`}>
            Do you have an account?
          </p>
          <Link to={routes.login} className={wpS.signUp}>
            Sign In.
          </Link>
        </form>
      </WhitePaper>
      <ErrorSnackbar />
    </section>
  );
};

// add a comment
