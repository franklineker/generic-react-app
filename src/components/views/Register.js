
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Register.module.css';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../../api/axios';
import { env } from '../../env/environment';

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#@$%]).{8,24}$/;
const UPPER_REGEX = /^(?=.*[A-Z]).*$/;
const LOWER_REGEX = /^(?=.*[a-z]).*$/;
const NUM_REGEX = /^(?=.*[0-9]).*$/;
const SPECIAL_CHAR_REGEX = /^(.*[!#@$%]).*$/;
const PWD_SIZE_REGEX = /^(?=.*).{8,24}$/;

export default function Register() {

    const usernameRef = useRef();
    const errRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [numCheck, setNumCheck] = useState(false);
    const [upperCheck, setUpperCheck] = useState(false);
    const [lowerCheck, setLowerCheck] = useState(false);
    const [charCheck, setCharCheck] = useState(false);
    const [sizeCheck, setSizeCheck] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [MatchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username])

    useEffect(() => {
        const resultPwd = PWD_REGEX.test(pwd);
        const resultUpper = UPPER_REGEX.test(pwd);
        const resultLower = LOWER_REGEX.test(pwd);
        const resultNum = NUM_REGEX.test(pwd);
        const resultChar = SPECIAL_CHAR_REGEX.test(pwd);
        const resultSize = PWD_SIZE_REGEX.test(pwd);

        setValidPwd(resultPwd);
        setNumCheck(resultNum);
        setUpperCheck(resultUpper);
        setLowerCheck(resultLower);
        setCharCheck(resultChar);
        setSizeCheck(resultSize);
    }, [pwd])

    useEffect(() => {
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, pwd, matchPwd])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const check1 = USERNAME_REGEX.test(username);
        const check2 = PWD_REGEX.test(pwd);
        console.log(check1)
        console.log(check2)
        if (!check1 || !check2) {
            setErrMsg("Entrada inválida!");
            return;
        }

        try {
            await axios
                .post(env.REGISTER_URL,
                    {
                        email: username,
                        password: pwd,
                        roles: ["USER"]
                    }
                )
                .then(() => {
                    setSuccess(true);
                })
                .catch(err => {
                    console.log(err)
                    console.log(err.response.status)
                    if (err.response.status === 409) {
                        setErrMsg("Nome de usuário já existe.");
                        errRef.current.focus();
                    }
                });

        } catch (error) {
            setErrMsg(error.message);
            errRef.current.focus();
            console.log(error.message)
        }

    }

    return (
        <>
            {success ?
                (
                    <section className={styles.register}>
                        <span className={`${styles.form} text-center`}>
                            Sucesso na requisição!
                        </span>
                    </section>
                ) :
                (
                    <section className={styles.register}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offScreen} aria-live='assertive'>{errMsg}</p>
                            <h1 className={styles.h1}>Registre-se</h1>
                            <label htmlFor='username'>
                                Usuário:
                                <span className={validUsername ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validUsername || !username ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='username'
                                type='text'
                                ref={usernameRef}
                                autoComplete='off'
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                aria-invalid={validUsername ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)}
                            />
                            <p
                                id='uidnote'
                                className={`${usernameFocus && username && !validUsername ? styles.instructions : styles.offscreen} d-flex`}>

                                <FontAwesomeIcon icon={faInfoCircle} className='mt-1' />
                                <span className='mx-2'>
                                    Precisa ter de 4 a 24 caracteres. <br />
                                    Precisa começar com uma letra. <br />
                                    Letras, números, hífens, underlines apenas.
                                </span>
                            </p>
                            <label htmlFor='pwd'>
                                Senha:
                                <span className={validPwd ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='pwd'
                                type='password'
                                autoComplete='off'
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p
                                id='pwdnote'
                                className={pwdFocus && !validPwd ? styles.instructions : styles.offscreen}>
                                <span className='d-flex'>
                                    <FontAwesomeIcon icon={faCheck} className={upperCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!upperCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos uma letra maúscula.
                                </span>
                                <span className='d-flex'>
                                    <FontAwesomeIcon icon={faCheck} className={lowerCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!lowerCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos uma letra minúscula.
                                </span>
                                <span className='d-flex'>
                                    <FontAwesomeIcon icon={faCheck} className={numCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!numCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos um número.
                                </span>
                                <span className='d-flex'>
                                    <FontAwesomeIcon icon={faCheck} className={charCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!charCheck ? styles.invalid : styles.hide} />
                                    Deve conter pelo menos um caractere especial (!#@$%).
                                </span>
                                <span className='d-flex'>
                                    <FontAwesomeIcon icon={faCheck} className={sizeCheck ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!sizeCheck ? styles.invalid : styles.hide} />
                                    Deve conter de 8 a 24 caracteres.
                                </span>
                            </p>
                            <label htmlFor='matchPwd'>
                                Confirme a senha:
                                <span className={validMatch && matchPwd ? styles.valid : styles.hide}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? styles.hide : styles.invalid}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </label>
                            <input
                                className={styles.input}
                                id='matchPwd'
                                type='password'
                                autoComplete='off'
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="matchPwdNote"
                                onFocus={() => setMatchPwdFocus(true)}
                                onBlur={() => setMatchPwdFocus(false)}
                            />
                            <p id='matchPwdNote' className={!validMatch && matchPwd && MatchPwdFocus ? styles.instructions : styles.offscreen}>
                                <span className='d-flex align-items-center'>
                                    <FontAwesomeIcon icon={faCheck} className={validMatch ? styles.valid : styles.hide} />
                                    <FontAwesomeIcon icon={faTimes} className={!validMatch ? styles.invalid : styles.hide} />
                                    A senha e sua confirmação devem ser iguais.
                                </span>
                            </p>

                            <button
                                className='btn btn-warning mt-5'
                                onClick={(e) => handleSubmit(e)}
                                disabled={!validUsername || !validPwd || !validMatch ? true : false}>
                                Enviar
                            </button>
                        </form>
                    </section>
                )
            }
        </>
    )
}
