import React, {useRef, useState} from 'react';
import {auth, firebase} from "../../firebase/firebase";


const LoginForm = () => {
    // const [loading, setLoading] = useState(false);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [myNumber, setNumber] = useState("");
    const [otp, setOtp] = useState('');
    const [show, setShow] = useState(false);
    const [final, setFinal] = useState('');

    // Sent OTP
    const signIn = () => {

        if (myNumber === "" || myNumber.length < 10) return;

        let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        auth.signInWithPhoneNumber(myNumber, verify)
            .then((result) => {
                setFinal(result);
                alert("code sent")
                setShow(true);
            })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });


        auth.signInWithPhoneNumber(myNumber, verify)
            .then(phoneUser => {
                console.log(phoneUser)
            })
            .catch((err) => {
                alert(err);
                window.location.reload()
            });


    }

    // Validate OTP
    const ValidateOtp = () => {
        if (otp === null || final === null)
            return;
        final.confirm(otp).then((result) => {
            // success
        }).catch((err) => {
            alert("Wrong code");
        })
    }


    //Регистрация по -mail
    const register = async (e) => {
        e.preventDefault()

        try {
            await auth.createUserWithEmailAndPassword(
                emailRef.current.value,
                passwordRef.current.value
            ).then((authUser) => {
                console.log(authUser)
            })
        } catch (error) {
            alert(error.message)
        }
    }


    const logIn = (e) => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
            .then(authUser => {
                console.log(authUser)
            })
            .catch(error => {
                alert(error.message)
            })
    }

    return (
        <div className="loginForm">
            <form className="flex flex-col">
                <h1 className="mb-[5px]">Sign in e-mail</h1>
                <input ref={emailRef} className="outline-0 h-[40px] mb-[14px] rounded-sm loginForm_input"
                       placeholder='email'
                       type="email"/>
                <input ref={passwordRef} className="outline-0 h-[40px] mb-[14px] rounded-sm loginForm_input"
                       placeholder='password'
                       type="password"/>
                <button onClick={logIn}
                        className="loginForm_button" type="submit">Sign up e-mail
                </button>
                {/*it is also possible by number*/}
                <h4 className="mt-[10px] ">
                    <span className="text-gray-700 text-base font-semibold mr-[2px]">New to Trailers?</span>
                    <a onClick={register}
                       className="text-white loginForm_signUp" href="/">Sign up now.</a>
                </h4>
                <br/>
            </form>


            <h1 className="mb-[5px]">Sign in Phone</h1>
            <div style={{display: !show ? "block" : "none"}}>
                <input value={myNumber} onChange={(e) => {
                    setNumber(e.target.value)
                }}
                       className="outline-0 h-[40px] rounded-sm loginForm_input"
                       placeholder="+79100000000"/>
                <br/><br/>
                <div id="recaptcha-container">
                </div>
                <button className="loginForm_button"
                        onClick={signIn}>Send OTP
                </button>
            </div>
            <div style={{display: show ? "block" : "none"}}>
                <input
                    type="text"
                    placeholder={"Введите код подтверждения"}
                    className="outline-0 h-[40px] rounded-sm loginForm_input"
                    onChange={(e) => {
                        setOtp(e.target.value)
                    }}>
                </input>
                <br/><br/>
                <button className="loginForm_button"
                        onClick={ValidateOtp}>Verify
                </button>
            </div>


        </div>
    );
}

export default LoginForm;