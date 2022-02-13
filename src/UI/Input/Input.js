import React from 'react';
import styles from './Input.module.css'

const Input = () => {
    return (
        <>
            <input type="email"
                   className={styles.inputSearch} id="input-search"/>
            <label className={styles.search} htmlFor="input-search">
            </label>
        </>
    );
}

export default Input;