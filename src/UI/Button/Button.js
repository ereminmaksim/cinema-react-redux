import React from 'react';
import styles from './Button.module.css'
import {Link} from "react-router-dom";

const Button = ( {handlerLogin} ) => {
    return (
        <>
            <Link onClick={handlerLogin} to="#"
               className={styles.bott}>
                Get Start E-mail
            </Link>
        </>
    );
}
export default Button;