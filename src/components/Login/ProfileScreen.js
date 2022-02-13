import React from 'react';
import Navbar from "../Home/Navbar";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/user/userSlice";
import {auth} from "../../firebase/firebase";
import PlanScreen from "../Home/PlanScreen";
import Alex from '../../UI/Alex.jpg'

const ProfileScreen = () => {
    const user = useSelector(selectUser)

    return (
        <div className="profileScreen"
             style={{
                 background: 'url("https://nevseoboi.com.ua/uploads/posts/2011-04/1302365208_w0000064_www.nevseoboi.com.ua.jpg")' +
                     'center center no-repeat',
                 backgroundSize: "cover",
             }}
        >
            <Navbar/>
            <div className="profileScreen__body">
                <h1 className='profileScreen__info__text'>Edit profile</h1>
                <div className='flex profileScreen__info__info'>
                    <img className='h-[100px]'
                         // src="https://img.quizur.com/f/img5e36a0d0d70910.94238953.jpg?lastEdited=1580638419" alt=""/>
                    src={Alex} alt=""/>
                    <div className='profileScreen__details'>
                        <h2 className='profileScreen__details__text'>
                            Вы зашли с помощью: {user.email ?? user.phoneNumber}
                        </h2>

                        <PlanScreen/>

                        <div>
                            <button className='profileScreen__signOut' onClick={() => auth.signOut()}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
        ;
}

export default ProfileScreen;