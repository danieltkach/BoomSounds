import axios from 'axios';
export const FETCH_REVIEW =  "FETCH_REVIEW"
export const SET_REVIEW = "SET_REVIEW"



export const postReviews = (productId, reviews) => {
	return function (dispatch){
	axios({
		method: 'POST',
		url: `http://localhost:3001/products/${productId}/review`,
		data: reviews,
	  })
	  .then(res => {
		  axios.get(
			`http://localhost:3001/products/${productId}/review`
		)
	  .then(response => {
		  console.log("esto es response" ,response.data)
		  dispatch({type:SET_REVIEW, payload: response.data})
	  })
	  })
	  
	  .catch(error => console.log(error))
	}
}

export const fetchReviews = ( prodId ) => {
	return function (dispatch) {
		axios
			.get(
				`http://localhost:3001/products/${prodId}/review`
			)
			.then((response) => dispatch({ type: FETCH_REVIEW, payload: response.data }))
			.catch((error) => console.log(error));
	};
}

