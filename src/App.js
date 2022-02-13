import React, {useEffect} from 'react';
import {Routes, Route} from "react-router-dom";
/************************************************/
import HomeScreen from "./components/Home/HomeScreen";
import Login from "./components/Login/Login";
/************************************************/
import {auth} from "./firebase/firebase";
import {useDispatch, useSelector} from "react-redux";
import {login, logOut, selectUser} from "./features/user/userSlice";
import ProfileScreen from "./components/Login/ProfileScreen";
import ErrorLogin from "./components/Login/ErrorLogin/ErrorLogin";


const App = () => {

    // const user = {
    //     name: "max"
    // }
    // const user = null


    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    //проверка, пользватель всети/не всети
    useEffect(() => {
        try {
            async function fetchData() {

                const unsubscribe = auth.onAuthStateChanged(userAuth => {
                    if (userAuth) {
                        //В сети
                        // console.log(userAuth)
                        dispatch(login({
                            uid: userAuth.uid,
                            email: userAuth.email,
                            phoneNumber: userAuth.phoneNumber
                        }))

                    } else {
                        // Вышел
                        dispatch(logOut())
                    }

                    return unsubscribe
                })
            }

            fetchData().then(log => console.log(log))

        } catch (error) {
            console.log(error + "Ошибка при запросе данных")
        }

    }, [dispatch]);


    return (
        <div className='bg-neutral-900 app'>

            {!user ? (

                    <Login/>

            ) : (
                <Routes>
                    <>
                        <Route path="/profile"
                               element={<ProfileScreen/>}/>
                        <Route path="/"
                               exact
                               element={<HomeScreen/>}/>

                        <Route
                            path="*"
                            element={<ErrorLogin to="/" />}
                        />
                    </>
                </Routes>
            )}

        </div>
    );
}

export default App;
