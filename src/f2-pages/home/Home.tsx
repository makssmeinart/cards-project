import {Link} from "react-router-dom";
import {routes} from "../../f1-main/m2-bll/routes/routes";

export const Home = () => {
    return (
        <section>
            <h1>Home Page</h1>
            <ul>
                <li>
                    <Link to={routes.pageNotFound}>Page Not Found</Link>
                </li>
                <li>
                    <Link to={routes.profile}>Profile Page</Link>
                </li>
                <li>
                    <Link to={routes.login}>Login Page</Link>
                </li>
                <li>
                    <Link to={routes.register}>Register Page</Link>
                </li>
                <li>
                    <Link to={routes.newPassword}>New Password Page</Link>
                </li>
                <li>
                    <Link to={routes.recoverPassword}>Recover Password Page</Link>
                </li>
                <li>
                    <Link to={routes.testPage}>Test Page</Link>
                </li>
            </ul>
        </section>
    )
}