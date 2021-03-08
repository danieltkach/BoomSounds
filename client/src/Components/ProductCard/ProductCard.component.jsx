import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAudioUrl, changeStatus } from '../../redux/playPreview/actions';
import { addToCart, addToGuestCart } from '../../redux/cart/actions';
import './ProductCard.css';

const ProductCard = ({
  product,
  addToCart,
  addToGuestCart,
  userShopcart,
  userRole,
  changeStatus,
  setAudioUrl,
  isPlaying,
  audioUrl,
}) => {
  useEffect(() => {
    setAudioUrl(null);
  }, []);

  const [inCart, setInCart] = useState([]);
  const inCartClick = (id) => {
    setInCart([...inCart, id]);
  };

  return (
    <div
      key={product.id}
      class={`product-card-container ${
        audioUrl == product.audioUrl ? 'isPlaying-lights' : ''
      }`}
    >
      <div className="product-image">
        <img
          alt="productImage"
          className={
            audioUrl == product.audioUrl ? 'rotationOn' : 'rotationOff'
          }
          src={product.imgUrl}
        ></img>
      </div>

      <div className="product-info-container">
        <Link to={'/products/' + product.id}>
          <p className="product-name">{product.name}</p>
        </Link>
      </div>

      <div className="audio-buttons-container">
        {isPlaying && audioUrl == product.audioUrl ? (
          <button
            onClick={() => {
              setAudioUrl(null);
              changeStatus(false);
            }}
          >
            <FontAwesomeIcon type="icon" icon={faStop} />
          </button>
        ) : (
          <button
            onClick={() => {
              setAudioUrl(product.audioUrl);
              changeStatus(true);
            }}
          >
            <FontAwesomeIcon type="icon" icon={faPlay} />
          </button>
        )}
      </div>
      <div className="add-to-cart-container">
        <span className="product-price">${product.price}</span>
        <button
          className={`add-to-cart-button ${
            inCart.includes(product.id) ? 'in_cart' : ''
          }`}
          onClick={() => {
            if (userRole === 'guest') {
              addToGuestCart(product);
            } else addToCart(product.id, userShopcart);
            inCartClick(product.id);
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          {inCart.includes(product.id) ? ' ¡En carrito!' : ' Comprar'}
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userShopcart: state.users.userShopcart,
    userRole: state.users.userRole,
    prodsCart: state.productCart.productCart,
    isPlaying: state.playReducer.isPlaying,
    audioUrl: state.playReducer.audioUrl,
  };
};
export default connect(mapStateToProps, {
  addToCart,
  addToGuestCart,
  setAudioUrl,
  changeStatus,
})(ProductCard);
