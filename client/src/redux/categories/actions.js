import axios from 'axios';
export const GET_CATEGORIES = 'GET_CATEGORIES'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const ADD_CATEGORY_PRRODUCT = 'ADD_CATEGORY_PRODUCT'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export const delete_catProd = (idCat , idProd) => {
	return function (dispatch) {
		axios.delete(`http://localhost:3001/products/${idProd}/deleteCategory/${idCat}`)
			.then(json =>
				dispatch({ type: DELETE_CATEGORY, payload: json.data })
			)
			.catch(error => console.log(error))
	}
}



export const add_catProd = (idCat , idProd) => {
	return function (dispatch) {
		axios.post(`http://localhost:3001/products/${idProd}/category/${idCat}`)
			.then(json =>
				dispatch({ type: ADD_CATEGORY_PRRODUCT, payload: json.data })
			)
			.catch(error => console.log(error))
	}
}


export const fetch_cat = () => {
	return function (dispatch) {
		axios.get('http://localhost:3001/categories')
			.then(json =>
				dispatch({ type: GET_CATEGORIES, payload: json.data })
			)
			.catch(error => console.log(error))
	}
}

export const addCategory = (category) => {
	return{
		type: ADD_CATEGORY,
		payload : category
	}
}


export const deleteCategoryProduct = (idCat , idProd) => {

	return({
		type: DELETE_CATEGORY
	})
}