import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()


    //выполняем прокрутку сайта до мемента значений с использованием анимации
    const transitionNavBar = () => {
        (window.scrollY > 100) ? setShow(true) : setShow(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavBar)
        return () => {
            window.removeEventListener('scroll',transitionNavBar)
        };
    }, []);


    // animate-[ease-in]
    return (
        <>
            {/*<div className={`fixed top-0 p-[20px] w-full ${ show && 'bg-neutral-900'} h-[60px] nav-animation`}>*/}
            <div className={`nav-animation ${ show && 'bg-neutral-900'}`}>

                <div className='flex justify-between'>
                    <img onClick={() => navigate('/')}
                        className= "fixed top-[15px] left-0 w-[120px] object-contain px-[20px] cursor-pointer"
                        src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
                        alt="logo"/>
                    <img onClick={() => navigate('/profile')}
                        className=" img_avatar fixed cursor-pointer right-[20px] w-[35px] top-[15px]"
                        src="https://occ-0-769-768.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABZ2mdn_92ruEqx0QzXDv947nXRyeamVpcKT4xbR6N-51JGWihqgKLLIX9gO_E319FW3Qoqff4ujjappyQ8uskyFS6Q.png?r=a41"
                        alt="avatar"/>

                </div>

            </div>

        </>
    );
}

export default Navbar;