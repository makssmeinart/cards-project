import { Link } from "react-router-dom";
import { routes } from "../../../f1-main/m2-bll/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import { recoverPassword } from "../../../f1-main/m2-bll/reducers/recoverPassword/recoverPassword";
import React, { useState } from "react";
import { useFormik } from "formik";
import { RootAppStateType } from "../../../f1-main/m2-bll/store";
import { PendingStatusType } from "../../../f1-main/m2-bll/reducers/appReducer/appReducer";
import { Loading } from "f1-main/m1-ui/components/common";
import wpS from "../../../f1-main/m1-ui/components/common/whitePaper/whitePapter.module.css";
import sendMessageIcon from "../../../f3-assets/images/icons/sentMessageIcon.png";
import {
  ErrorInput,
  ErrorSnackbar,
  SuperButton,
  SuperInputText,
  WhitePaper,
} from "../../../f1-main/m1-ui/components/common";

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
      email: "",
    },
    validate: (values) => {
      const errors: { email?: string } = {};
      if (!values.email) {
        errors.email = "Email is required!";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(recoverPasswordCallback(values));
      resetForm();
    },
  });

  return (
    <>
      {
        // If page is loading load the spinner
        status === "loading" ? (
          <Loading />
        ) : (
          <section>
            {emailChecked ? (
              <>
                <WhitePaper>
                  <h2 className={wpS.subtitle}>Forgot Password?</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <SuperInputText
                      labelValue={"Email"}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <ErrorInput error={formik.errors.email} />
                    ) : (
                      <div style={{ height: "21px" }} />
                    )}
                    <p
                      className={`${wpS.dontHaveAccount} ${wpS.marginLeft}
                       ${wpS.marginBottomLarge}`}
                    >
                      Enter your email address and we will send you further
                      instructions{" "}
                    </p>
                    <SuperButton className={"primaryButton"} type={"submit"}>
                      Login
                    </SuperButton>
                  </form>
                  <p className={`${wpS.dontHaveAccount} ${wpS.marginYSmall}`}>
                    Don’t have an account?
                  </p>

                  <Link to={routes.register} className={wpS.signUp}>
                    Sign Up.
                  </Link>
                </WhitePaper>
              </>
            ) : (
              <WhitePaper>
                <img
                  className={wpS.messageSendIcon}
                  src={sendMessageIcon}
                  alt="Message sent icon"
                />
                <h2 className={wpS.subtitle}>Check Email</h2>
                <p className={`${wpS.dontHaveAccount} ${wpS.marginYSmall}`}>
                  We’ve sent an Email with instructions to
                  {formik.initialValues.email}
                </p>
              </WhitePaper>
            )}
            <ErrorSnackbar />
          </section>
        )
      }
    </>
  );
};

// Types

export type RecoverPasswordFormValues = {
  email: string;
};
