import {
	ADD_TO_CART,
	CLEAR_CART,
	POST_CATEGORIES,
	DELETE_PRODUCT_CART,
	GET_CART_COMPLETED,
	GET_LIBRARY_PRODUCTS
} from './actions.js';

const inicialState = {
	productCart: [],
	cartCompleted: [],
	libraryProducts: []
};

const productCartReducers = (state = inicialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				productCart: action.payload,
			};

		case POST_CATEGORIES:
			return {
				...state,
			};

		case CLEAR_CART:
			return {
				...state,
				productCart: {},
			};

		case DELETE_PRODUCT_CART:

			return {
				...state,
				productCart: state.productCart.filter(
					(prod) => prod.id !== action.payload
				),
			};

		case GET_CART_COMPLETED:
			return {
				...state,
				cartCompleted: action.payload
			};

		case GET_LIBRARY_PRODUCTS:
			return {
				...state,
				libraryProducts: action.payload
			}

		default:
			return state;
	}
};

export default productCartReducers;
