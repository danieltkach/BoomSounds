import axios from 'axios';
import React from 'react';
import styles from './UserResetPass.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

const UserResetPass = () =>{

    const url = window.location.pathname
    const token = url.split('/')[3]
    console.log("TK :", token)

     const changePass = (info) =>{

        

        axios.put(`http://localhost:3001/users/reset/${token}`, info)
            .then( () => console.log("Hecho"))
            .catch( () => console.log("Error en el put"))
    }

    return(
        <div className={styles.form_body}>
            <div className={styles.form_container}>
                <form action={`http://localhost:3001/users/reset/${token}`} 
                method="POST"
                className={styles.reset_form}>
                    <h4 className={styles.title_h4}>Ingrese la nueva contraseña</h4>
                    <div className={styles.input_container}>
                        <FontAwesomeIcon className="icon" icon={faKey} />
                        <input type='password'
                        name='password' 
                        className={styles.input_pass}></input>
                    </div>
                    <button className={styles.reset_btn}>Enviar</button>
                </form>
            </div>
        </div>
        
    )
}

export default UserResetPass;