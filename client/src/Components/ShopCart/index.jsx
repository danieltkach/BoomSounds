import React, { useEffect } from 'react';
import ProductsCart from '../ProductsCart';
import styles from './ShopCart.module.css';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  clear_cart,
  get_prod,
  getGuestProducts,
} from '../../redux/cart/actions';
import { saleCart } from '../../redux/users/actions';
import Checkout from '../Checkout/Checkout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const ShopCart = ({
  pc,
  clear_cart,
  get_prod,
  user,
  saleCart,
  getGuestProducts,
}) => {
  var history = useHistory();
  let total = 0;
  useEffect(() => {
    if (user.userRole === 'guest') {
      getGuestProducts();
    } else get_prod(user.userShopcart);
  }, [user]);

  const sale = (usuario) => {
    saleCart(usuario);
  };

  return (
    <div className={styles.cart_container}>
      {pc?.length ? (
        <>
          <p className={styles.p_none}> {pc.map((p) => (total += p.price))}</p>
          <div className={styles.table_container}>
            <table className={styles.cart_table}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Artista</th>
                  <th>Precio</th>
                  <th>
                    <button
                      className={styles.delete}
                      onClick={() => clear_cart(user)}
                    >
                      Vaciar carrito
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pc.map((p) => (
                  <ProductsCart product={p} />
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.total_bar}>
            <div className={styles.total}>
              <p className={styles.total_tag}>Total ${total} </p>{' '}
            </div>
            {user.userRole === 'guest' ? (
              <button
                onClick={() => {
                  history.push('/login');
                }}
                className="cmp main_button confirm_purchase"
              >
                <p>Login to continue</p>
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              </button>
            ) : (
              <Checkout total={total} shopcart={user.userShopcart} />
            )}
          </div>
        </>
      ) : (
        <div>
          <h3 className={styles.aviso}>
            Carrito sin elementos, visita nuestro{' '}
            <Link to="/catalog">catálogo</Link>
          </h3>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pc: state.productCart.productCart,
    user: state.users,
  };
};

export default connect(mapStateToProps, {
  clear_cart,
  get_prod,
  saleCart,
  getGuestProducts,
})(ShopCart);
