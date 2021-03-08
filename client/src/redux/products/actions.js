import axios from 'axios';
import * as actions from '../action-types';

export const modifyProduct = (id) => ({
  type: actions.MODIFY_PRODUCT,
  payload: {
    productId: id,
  },
});

export const deleteCategoryProduct = (idCat, idProd) => {
  return {
    type: actions.DELETE_CATEGORY_PRODUCT,
    payload: {
      cat: idCat,
      prod: idProd,
    },
  };
};

export const AddCategoryProduct = (idCat, idProd) => {
  return {
    type: actions.ADD_CATEGORY_PRODUCT,
    payload: {
      cat: idCat,
      prod: idProd,
    },
  };
};

export function fetch_prod() {
  return function (dispatch) {
    axios
      .get('http://localhost:3001/products')
      .then((json) =>
        dispatch({ type: actions.GET_PRODUCTS, payload: json.data })
      )
      .catch((error) => console.log(error));
  };
}

export const filterProds = (category) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/products/categoria/${category}`)
      .then((res) => {
        dispatch({ type: actions.SET_PRODUCTS, payload: res.data });
      });
  };
};

export const searchProds = (kw) => {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/products/searchKey?q=${kw}`)
      .then((res) => {
        dispatch({ type: actions.SET_PRODUCTS, payload: res.data });
      });
  };
};

export const delete_Prod = (idProd) => {

	return function (dispatch) {
		axios.delete(`http://localhost:3001/products/${idProd}`)
			.then(json =>
				dispatch({ type: actions.DELETE_PRODUCT, payload: idProd })
			)
			.catch(error => console.log(error))
	}
}
