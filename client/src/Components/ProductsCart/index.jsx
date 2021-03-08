import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { delete_product, deleteGuestProduct } from '../../redux/cart/actions';
import { get_prod } from '../../redux/cart/actions';
import styles from './ProductsCart.module.css';
import PlayPreview from './../../Admin/PlayPreview/PlayPreview.component';

const ProductsCart = ({
  product,
  delete_product,
  prodsCart,
  user,
  deleteGuestProduct,
}) => {
  const delProd = (id, user) => {
    if (user.userRole == 'guest') {
      deleteGuestProduct(id);
    } else delete_product(id, user);
  };
  return (
    <tr>
      <td>
        <img
          alt="productImage"
          src={product.imgUrl}
          className={styles.imgCart}
        ></img>{' '}
        {product.name}
      </td>
      <td>{product.artist}</td>
      <td>${product.price}</td>

      <button
        className={styles.btnDel}
        onClick={() => delProd(product.id, user)}
      >
        <FontAwesomeIcon className={styles.icon} icon={faTrashAlt} />
      </button>
    </tr>
  );
};

const mapStateToProps = (state) => {
  return {
    prodsCart: state.productCart.productCart,
    user: state.users,
  };
};
export default connect(mapStateToProps, {
  delete_product,
  deleteGuestProduct,
  get_prod,
})(ProductsCart);
