/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthProvider";
import styles from "../styles/Register.module.css";
import axios from "axios";
import { env } from "../../env/environment";

const TOKEN_URL = env.TOKEN_URL;
const REDIRECT_URL = env.REDIRECT_URL;
const GRANT_TYPE = env.GRANT_TYPE;
const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;

export default function Login() {

    const { auth, setAuth } = useContext(AuthContext);
    console.log("auth ", auth)


    const handleToken = async () => {

        const seachParams = new URLSearchParams(window.location.search);
        const code = seachParams.get("code");
        const codeVerifier = localStorage.getItem("codeVerifier");

        console.log("verifier de auth => ", auth.codeVerifier)
        const body = new URLSearchParams();
        body.set("grant_type", GRANT_TYPE);
        body.set("client_id", CLIENT_ID);
        body.set("redirect_uri", REDIRECT_URL);
        body.set("code_verifier", codeVerifier);
        body.set("code", code);

        console.log(body.toString());

        try {
            const response = await axios.post(TOKEN_URL, body, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    username: CLIENT_ID,
                    password: CLIENT_SECRET
                }
            });

            console.log(response);
            const accessToken = response.data.access_token;
            const refreshToken = response.data.access_token;
            setAuth((prevAuth => ({
                ...prevAuth,
                refreshToken: refreshToken,
                accessToken: accessToken
            })));
            localStorage.removeItem("codeVerifier");
            console.log("auth => ", auth);

        } catch (error) {
            console.log("auth => ", auth);
            console.log(error);
        }

    }
    useEffect(() => {
        handleToken();
    }, [])

    return (
        <section className={styles.section}>
            <span>Login: {auth.accessToken}</span>
        </section>
    )
}
