import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';

const Checkout = ({ total, shopcart, user }) => {
  return (
    <form action="http://localhost:3001/mercadopago/" method="POST">
      <input type="hidden" name="total" value={total}></input>
      <input type="hidden" name="idOrder" value={shopcart}></input>
      <input type="hidden" name="idUser" value={user}></input>
      <button type="submit" className="cmp main_button confirm_purchase">
        CONFIRMAR COMPRA
      </button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.productCart.productCart,
    user: state.users.userID,
  };
};

export default connect(mapStateToProps)(Checkout);
