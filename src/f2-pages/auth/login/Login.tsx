import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SuperInputText } from "../../../f1-main/m1-ui/components/common/superInput/SuperInput";
import { SuperButton } from "../../../f1-main/m1-ui/components/common/superButton/SuperButton";
import { SuperCheckbox } from "../../../f1-main/m1-ui/components/common/superCheckbox/SuperCheckbox";
import { LoginParamsType } from "../../../f1-main/m3-dal/api";
import { LoginTC } from "../../../f1-main/m2-bll/reducers/login/loginReducer";
import { Link, Navigate } from "react-router-dom";
import { RootAppStateType } from "../../../f1-main/m2-bll/store";
import React, { useState } from "react";
import s from "./Login.module.css";


export const Login = () => {
  const dispatch = useDispatch();
  const [reverseType, setReverseType] = useState<"password" | "text">(
    "password"
  );
  const isLoggedIn = useSelector<RootAppStateType>(
    (state) => state.app.isLoggedIn
  );
  const errorMessage = useSelector<RootAppStateType>(
    (state) => state.app.errorMessage
  );
  const onClickHandler = () => {
    if (reverseType === "password") {
      setReverseType("text");
    } else if (reverseType === "text") {
      setReverseType("password");
    }
  };

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
    return <Navigate to="/profile" />;
  }

  return (
    <section className={s.s}>
      <form className={s.s} onSubmit={formik.handleSubmit}>
        <SuperInputText type={"text"} {...formik.getFieldProps("email")} />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <SuperInputText
          type={reverseType}
          {...formik.getFieldProps("password")}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </form>

      <SuperButton onClick={onClickHandler}>hide</SuperButton>

      <form className={s.s} onSubmit={formik.handleSubmit}>
        <SuperCheckbox
          name="rememberMe"
          onChange={formik.handleChange}
          checked={formik.values.rememberMe}
        />
        <SuperButton type={"submit"}>Login</SuperButton>
      </form>
      {errorMessage ? <div>.{errorMessage}.</div> : null}

      <Link to={"/register"}>Register</Link>
    </section>
  );
};
