import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faMusic,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { fetch_users } from '../../redux/users/actions';
import { get_shopcartsCompleted } from '../../redux/cart/actions';
import styles from './Dashboard.module.css';

const Dashboard = ({
  products,
  fetch_users,
  users,
  cartCompleted,
  get_shopcartsCompleted,
}) => {
  useEffect(() => {
    fetch_users();
    get_shopcartsCompleted();
  }, []);

  return (
    <>
      <h1>Estadísticas del sitio</h1>
      <div className={styles.data_container}>
        <ul>
          <li>
            <FontAwesomeIcon className="icon" icon={faUser} /> Usuarios:{' '}
            {users.length}
          </li>
          <li>
            {' '}
            <FontAwesomeIcon className="icon" icon={faMusic} /> Productos:{' '}
            {products.length}
          </li>
          <li>
            {' '}
            <FontAwesomeIcon
              className="icon"
              icon={faShoppingCart}
            /> Órdenes: {cartCompleted.length}
          </li>
        </ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    products: state.products.products,
    cartCompleted: state.productCart.cartCompleted,
  };
};

export default connect(mapStateToProps, {
  fetch_users,
  get_shopcartsCompleted,
})(Dashboard);
