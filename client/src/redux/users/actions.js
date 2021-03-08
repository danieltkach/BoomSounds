import axios from 'axios';
import * as actions from '../action-types';
export const GET_SALE_CART = "GET_SALE_CART";
export const GET_CANCEL_CART = "GET_CANCEL_CART";
export const FETCH_ALL_SHOPCARTS = "FETCH_ALL_SHOPCARTS"
export const setUser = (userID) => {
	return {
		type: actions.SET_USER,
		payload: userID,
	};
};
export const setUserShopcart = (userID) => {
	let shopcartID;
	return function (dispatch) {
		if (userID != null) {
			axios
				.get(`http://localhost:3001/shopcart/user/${userID}`)
				.then((res) => {
					shopcartID = res.data;
				})
				.then(() => {
					dispatch({ type: actions.SET_SHOPCART, payload: shopcartID });
				});
		} else dispatch({ type: actions.SET_SHOPCART, payload: null });
	};
};

export const setUserRole = (userID) => {
	let role;
	return function (dispatch) {
		if (userID != null) {
			axios
				.get(`http://localhost:3001/users/${userID}/role`)
				.then((res) => {
					role = res.data;
				})
				.then(() => {
					dispatch({ type: actions.SET_USER_ROLE, payload: role });
				});
		} else dispatch({ type: actions.SET_USER_ROLE, payload: 'guest' });
	};
};

export function fetch_users() {
	return function (dispatch) {
		axios
			.get('http://localhost:3001/users')
			.then((json) => dispatch({ type: actions.GET_USERS, payload: json.data }))
			.catch((error) => console.log(error));
	};
}

export function fetch_user(idUser) {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/users/${idUser}`)
      .then((json) => dispatch({ type: actions.GET_USER, payload: json.data }))
      .catch((error) => console.log(error));
  };

}

export const saleCart = (shopcart , id) => {
  return function(dispatch){
    axios.put(`http://localhost:3001/shopcart/${id}/setStatus/${'completed'}/${shopcart}`)
    .then(json => dispatch({type:actions.SALE_CART , payload:json.data}))
    .catch(error => console.log(error))
  }
}

export const cancelCart = (shopcart, id) => {
	return function (dispatch) {
		axios.put(`http://localhost:3001/shopcart/${id}/setStatus/${'cancelled'}/${shopcart}`)
			.then(json => dispatch({ type: actions.CANCEL_CART, payload: json.data }))
			.catch(error => console.log(error))
	}
}

export const promote = (id) =>{
  return function(dispatch){
    axios.put(`http://localhost:3001/users/promote/${id}`)
    .then(json => dispatch({type : actions.PROMOTE , payload: json.data}))
  }
}

export const demote= (id) =>{
  return function(dispatch){
    axios.put(`http://localhost:3001/users/demote/${id}`)
    .then(json => dispatch({type : actions.DEMOTE , payload: json.data}))
  }
}

export const fetchAllShopCarts = () => {
  return function(dispatch){
  axios.get("http://localhost:3001/shopcart/products")
  .then( res => {
    dispatch({type: FETCH_ALL_SHOPCARTS, payload:res.data})
  })
  }
} 
export const getSaleCart = (shopcart , id) => {
  return function(dispatch){
    axios({
      method: 'PUT',
      url:`http://localhost:3001/shopcart/${id}/setStatus/${'completed'}/${shopcart}`
    })
    .then(res => {
      axios.get("http://localhost:3001/shopcart/products").then(json => dispatch({type:GET_SALE_CART , payload:json.data}))
    })
    
    .catch(error => console.log(error))
  }
}
export const getCancelCart = (shopcart , id) => {
  return function(dispatch){
    axios.put(`http://localhost:3001/shopcart/${id}/setStatus/${'cancelled'}/${shopcart}`)
    .then(res => {
      axios.get(`http://localhost:3001/shopcart/products`).then(response => { 
      console.log(response)
      dispatch({type:GET_CANCEL_CART , payload: response.data})
    })
    
    })
    .catch(error => console.log(error))
  }
}

export const ban = (id) => {
  return function(dispatch){
    axios.put(`http://localhost:3001/users/ban/${id}`)
      .then(json => dispatch({type: actions.BAN , payload: json.data}))
	}
}
