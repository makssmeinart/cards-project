import {useEffect} from "react";
import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0"
})


export const Login = () => {

    useEffect(() => {
        instance.post<any>("/auth/login", {
            email: "maks.mashko@gmail.com",
            password: "1475963mashko",
            rememberMe: false,
        }).then(resp => console.log(resp.data))
    }, [])


    return <section>Login Page11</section>;
};
