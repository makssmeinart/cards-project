import {Link} from "react-router-dom";
import {routes} from "../../../../m2-bll/routes/routes";
import React from "react";

export const Header = () => {
    return (
        <header style={{backgroundColor: "red"}}>
            <h1>Header</h1>
            <ul>
                <li>
                    <Link to={routes.packList}>packList</Link>
                </li>
                <li>
                    <Link to={routes.profile}>Profile Page</Link>
                </li>
            </ul>
        </header>
    )
}