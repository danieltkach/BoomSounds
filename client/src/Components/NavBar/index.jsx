//React
import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
//Redux
import { connect } from 'react-redux';
import {
  setUser,
  setUserShopcart,
  setUserRole,
} from '../../redux/users/actions';
//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
//Styles
import './NavBar.css';
//Toast
import { useToasts } from 'react-toast-notifications';
//Firebase
import firebase from 'firebase';
import 'firebase/auth';
import { Fragment } from 'react';
import * as BoxIcons from 'react-icons/bi';

const Nav = ({ setUser, setUserShopcart, setUserRole, userRole, userID }) => {
  const { addToast } = useToasts();
  const history = useHistory();

  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        addToast('Se ha cerrado sesion!', {
          appearance: 'info',
          autoDismiss: true,
        });
        setUser();
        setUserShopcart();
        setUserRole();

        history.push('/');
      });
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link className="navbar-brand m-3" to="/">
          <img
            className="boomsounds-home-logo"
            src="./jpg/boomsounds-words.png"
            alt="boomsounds words logo"
          />
        </Link>
        {userRole === 'admin' ? (
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                to="/catalog"
                activeClassName="active"
                className="nav-link"
              >
                <span className="menu-item">Catálogo</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/admin" className="nav-link">
                ADMIN
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink
                to="/catalog"
                activeClassName="active"
                className="nav-link"
              >
                <span className="menu-item">Catálogo</span>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
      {userRole !== 'guest' ?
      <div className="btn_music_library">
        
        <NavLink to="/my-library">
          <BoxIcons.BiMusic />
          Mi Musiteca
        </NavLink>
      </div>  : ''} 
      <div className="btn_cart">
        <NavLink to="/shopCart">
          <FontAwesomeIcon className="icon" icon={faShoppingCart} />
        </NavLink>
      </div>

      {userID ? (
        <div className="btn_user">
          <div className="btn_profile">
            <NavLink to="/user-profile">
              <FontAwesomeIcon className="icon" icon={faUserCircle} />
            </NavLink>
          </div>
          <div className="btn_logout">
            <FontAwesomeIcon
              onClick={() => {
                logOut();
              }}
              className="icon"
              icon={faSignOutAlt}
            />
          </div>
        </div>
      ) : (
        <div className="btn_login">
          <NavLink to="/login">
            <FontAwesomeIcon className="icon" icon={faSignInAlt} />
          </NavLink>
        </div>
      )}
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.users.userRole,
    userID: state.users.userID,
  };
};

export default connect(mapStateToProps, {
  setUser,
  setUserShopcart,
  setUserRole,
})(Nav);
