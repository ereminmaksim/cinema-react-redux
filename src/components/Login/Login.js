import React, {useState} from 'react';
import LoginForm from "./LoginForm";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Alex from '../../UI/Alex.jpg'





const Login = () => {

    const [loginIn, setLoginIn] = useState(false);

    const handlerLogin = () => {
        setLoginIn(true)
    }




    return (
        <div className="relative h-full"
             style={{
                 background: 'url("https://simkl.in/fanart/97/97333937f8b98c3_medium.jpg")'  +
                     'center no-repeat',
                 backgroundSize: "cover",
             }}
        >
            <div className=" flex justify-center items-center">
                <img className="img_netflix fixed left-0 w-[150px] object-contain top-[20px] pl-[20px] cursor-pointer"
                src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"

                     alt="banner_login"
                />
                <button onClick={handlerLogin}
                        className="fixed right-[20px] top-[20px] text-base bg-red-700 btn__login text-white">Sign in
                </button>
                <div className="login_bg_gradient">

                </div>

                <div className="login_body">
                    {loginIn ?
                        (<LoginForm/>)
                        :
                        <>
                            <h1 className="text-6xl mb-[20px]">Unlimited films, TV programmes and more</h1>
                            <h2 className="text-4xl mb-[30px] font-normal">Watch anywhere. Cancel at any time</h2>
                            <h3 className="login_description text-2xl font-normal">Ready to watch? Enter your e-mail to
                                create or restart your
                                membership</h3>
                            <div>
                                <form className="flex justify-center">
                                    <Input/>
                                    <Button handlerLogin={handlerLogin}/>
                                </form>
                            </div>

                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Login;