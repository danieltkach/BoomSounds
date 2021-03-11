//React
import React,  { useState }  from 'react';
import axios from 'axios';

//Toast
import { useToasts } from 'react-toast-notifications';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
//Styles
import './ResetPassword.css';


function ResetPassword () {
    const { addToast } = useToasts();

    function sendEmail(e) {
        
        e.preventDefault();
        
        var email = document.getElementById('email').value;

        axios
          .post('http://localhost:3001/users/auth/forgot', {
            email
          })
          .then(() => {
            addToast('Email enviado, por favor verifique su casilla de correo.', {
              appearance: 'success',
              autoDismiss: true,
            });
            document.getElementById('email').value = '';
          })
          .catch(()=>{
            addToast('Email incorrecto, porfavor ingrese un mail correcto', {
              appearance: 'error',
              autoDismiss: true,
            });

          })
    }
    
    return (
        <div className="forgot-formContainer">
          <div className="forgot-form">
            <h4>Recuperar contraseña</h4>
            <form>
              <div className="forgot-fieldCont">
                <FontAwesomeIcon className="icon" icon={faUser} />
                <input
                  className="forgotInput"
                  id="email"
                  placeholder="Ingrese su email.."
                />
              </div>
    
              <div className="sendBtnCnt">
                <button onClick={ sendEmail }>Enviar</button>
              </div>
            </form> 
          </div>
        </div>
      );
    
}



  export default ResetPassword;