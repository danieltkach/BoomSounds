import * as actions from '../action-types';

const initialState = {
	products: [],
};

const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.GET_PRODUCTS: {
			return {
				...state,
				products: action.payload,
			}
		}
		case actions.SET_PRODUCTS: {
			return {
				...state,
				products: action.payload,
			}
		}

		case actions.DELETE_CATEGORY_PRODUCT: {
			const index = state.products.findIndex((prod) => prod.id === action.payload.prod)
			const producto = state.products.find((prod) => prod.id === action.payload.prod)
			const categfilt = producto.categories.filter(pc => pc.id !== action.payload.cat)
			state.products[index].categories = categfilt

			return {
				...state,
				products: state.products
			}
		}

		case actions.DELETE_PRODUCT: {

			return {
				...state,
				products: state.products.filter(p => p.id !== action.payload)
			}
		}

		case actions.ADD_CATEGORY_PRODUCT: {
			const index = state.products.findIndex((prod) => prod.id === action.payload.prod.id)
			state.products[index].categories = [...state.products[index].categories, action.payload.cat]
			return {
				...state,
				products: state.products
			}

		}

		default:
			return state
	}
}

export default productsReducer;