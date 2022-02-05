import {Link} from "react-router-dom";
import {routes} from "../../../f1-main/m2-bll/routes/routes";
import {useDispatch} from "react-redux";
import {recoverPassword} from "../../../f1-main/m2-bll/reducers/recoverPassword/recoverPassword";
import {useState} from "react";
import {useFormik} from "formik";

export const RecoverPassword = () => {
    const [emailChecked, setEmailChecked] = useState(true)
    const dispatch = useDispatch()

    const recoverPasswordCallback = (values: RecoverPasswordFormValues) => {
        dispatch(recoverPassword(values,setEmailChecked))
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: any = {}
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
        <section>
            {
                emailChecked
                    ?
                    <>
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.errors.email}
                            <button type="submit">Submit</button>
                        </form>
                        <Link to={routes.login}>Try logging in</Link>
                    </>
                    :
                    <h1>Check your email</h1>
            }
        </section>
    )
}

// Types

export type RecoverPasswordFormValues = {
    email: string
}