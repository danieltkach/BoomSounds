//React
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
//Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import GoogleLogin from 'react-google-login'
//Redux
import {checkLocalCart} from '../../redux/cart/actions'
import {connect}from 'react-redux'
//Toast
import { useToasts } from 'react-toast-notifications';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
//Styles
import './LogIn.css';

function LogIn({checkLocalCart}) {
  const { addToast } = useToasts();
  const history = useHistory();

  function register(e) {
    //Prevent reload
    e.preventDefault();
    //Get data from the from
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //Create user on DB
    axios
      .post('http://localhost:3001/users/', {
        email,
        password,
      })
      .then(() => {
        addToast('Registro exitoso! Por favor inicie sesion', {
          appearance: 'success',
          autoDismiss: true,
        });
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
      });
  }

  function login(e) {
    //Prevent reload
    e.preventDefault();
    //Get data from the from
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //Check user credentials & return token
    axios
      .post('http://localhost:3001/users/login', {
        email,
        password,
      })
      .then((token) => {
        //Authenticate with firebase token
        firebase
          .auth()
          .signInWithCustomToken(token.data)
          .then((createdUser) => {
            //Set email on firebaseUser
            createdUser.user.updateEmail(email);
            addToast('Bienvenido!', {
              appearance: 'success',
              autoDismiss: true,
            });
            checkLocalCart(createdUser.user.uid)
            history.push('/');
          })
          .catch((err) => {
            //Handle FirebaseErrors
            console.log('FirebaseError>> ' + err);
            addToast('Login Error!', {
              appearance: 'error',
              autoDismiss: true,
            });
          });
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              addToast('Wrong credentials!', {
                appearance: 'error',
                autoDismiss: true,
              });
              break;
            case 403:
              addToast('You are banned! Please contact an admin', {
                appearance: 'error',
                autoDismiss: true,
              });
              break;
            default: break;
          }
        }
      });
  }

  const handleGoogleAuth=(res)=>{
    if(res.profileObj){
      var email=res.profileObj.email;
      axios.get(`http://localhost:3001/users/login/googleAuth/${email}`).then(res=>{
        firebase.auth().signInWithCustomToken(res.data).then(loggedUser=>{
          loggedUser.user.updateEmail(email);
          addToast('Bienvenido!', {
            appearance: 'success',
            autoDismiss: true,
          });
          checkLocalCart(loggedUser.user.uid)
          history.push('/');
        })
      })
    }
  }

  return (
    <div className="formContainer">
      <div className="login-form">
        <h3>Iniciar sesión</h3>
        <form>
          <div className="fieldContainer">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <input
              className="loginInput"
              id="email"
              placeholder="Enter email address"
            ></input>
          </div>

          <div className="fieldContainer">
            <FontAwesomeIcon className="icon" icon={faKey} />
            <input
              className="loginInput"
              id="password"
              placeholder="Enter password"
              type="password"
            ></input>
          </div>
          <div className="buttonContainer">
            <button onClick={login}>Sign-In</button>
            <button onClick={register}>Register</button>
            <GoogleLogin
              clientId="1074757138881-v7iqvdmp47aim356gpgdug782u4ocgrq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={handleGoogleAuth}
              onFailure={handleGoogleAuth}
              cookiePolicy={'single_host_origin'}
            />
          </div>
        </form>
        <hr />
        <a href="http://localhost:3000/forgot">Has olvidado tu contraseña?</a>
      </div>
    </div>
  );
}

export default connect(null,{checkLocalCart}) (LogIn);
