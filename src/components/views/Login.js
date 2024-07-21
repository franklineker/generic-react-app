/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react"
import AuthContext from "../../context/AuthProvider";
import styles from "../styles/Register.module.css";
import axios from "axios";
import { env } from "../../env/environment";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const TOKEN_URL = env.TOKEN_URL;
const REDIRECT_URL = env.REDIRECT_URL;
const GRANT_TYPE = env.GRANT_TYPE;
const CLIENT_ID = env.CLIENT_ID;
const CLIENT_SECRET = env.CLIENT_SECRET;

export default function Login() {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleToken = async () => {

        const seachParams = new URLSearchParams(window.location.search);
        const code = seachParams.get("code");
        const codeVerifier = localStorage.getItem("codeVerifier");

        const body = new URLSearchParams();
        body.set("grant_type", GRANT_TYPE);
        body.set("client_id", CLIENT_ID);
        body.set("redirect_uri", REDIRECT_URL);
        body.set("code_verifier", codeVerifier);
        body.set("code", code);

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

            const accessToken = response.data.access_token;
            const refreshToken = response.data.access_token;
            const decodedToken = jwtDecode(accessToken);
            const roles = decodedToken.roles;

            setAuth((prevAuth => ({
                ...prevAuth,
                refreshToken: refreshToken,
                accessToken: accessToken,
                user: {
                    roles: roles
                }
            })));

            localStorage.removeItem("codeVerifier");
            navigate("/");

        } catch (error) {
            console.log(error);
            if (!error?.response) {
                alert("Servidor de autenticação não está respondendo...")
            }
        }

    }

    useEffect(() => {
        handleToken();
    }, [])

    return (
        <section className={styles.section}>
            <span>Login:</span>
        </section>
    )
}
