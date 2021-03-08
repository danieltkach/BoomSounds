import axios from 'axios';
export const ADD_TO_CART = 'ADD_TO_CART';
export const POST_CATEGORIES = 'POST_CATEGORIES';
export const CLEAR_CART = 'CLEAR_CART';
export const DELETE_PRODUCT_CART = 'DELETE_PRODUCT_CART';
export const GET_CART_COMPLETED = 'GET_CARD_COMPLETED';
export const GET_LIBRARY_PRODUCTS = 'GET_LIBRARY_PRODUCTS';

export const addToCart = (prodId, userShopcart) => {
	return function (dispatch) {
		axios
			.post(
				`http://localhost:3001/shopcart/${userShopcart}/product/${prodId}`
			)
      .then(() => dispatch({ type: POST_CATEGORIES }))
      .then(()=>{

        console.log('Product saved! - ',prodId,' to shopcart: ',userShopcart);
      })
			.catch((error) => console.log(error));
	};
}

//Obtener productos de un carrtio determinado por id de usuario
export const get_prod = (shopcartID) => {
	return function (dispatch) {
		axios
			.get(`http://localhost:3001/shopcart/${shopcartID}?includeProducts=true`)
			//Guardamos en el store los productos del carrtio especificado
			.then((res) => {
				dispatch({ type: ADD_TO_CART, payload: res.data.products });
			})
			.catch((error) => console.log(error));
	};
};

export const clear_cart = (user) => {
  if(user.userRole=='guest'){
    return function(dispatch){
      window.localStorage.setItem('guestCart',[])
      dispatch({ type: CLEAR_CART, payload: [] })
    }
  }
	else {
    return function (dispatch) {
      let shopcartID;
      //Obtenemos el id del carrito del usuario
      axios
        .get(`http://localhost:3001/shopcart/user/${user.userID}`)
        .then((id) => (shopcartID = id.data))
        .then(() => {
          axios
            .delete(
              `http://localhost:3001/shopcart/deleteAllProducts/${user.userShopcart}`
            )
            .then((json) => dispatch({ type: CLEAR_CART, payload: json.data }))
            .catch(() => console.log('Error!!'));
        });
    };
  }
};

export const delete_product = (id, user) => {
  return function (dispatch) {
    var shopcartID;
    //Obtenemos el id del carrito del usuario
    axios
      .get(`http://localhost:3001/shopcart/user/${user.userID}`)
      .then((id) => (shopcartID = id.data))
      .then(() => {
        axios
          .delete(
            `http://localhost:3001/shopcart/${shopcartID}/deleteOneProduct/${id}`
          )
          .then((json) =>
            dispatch({ type: DELETE_PRODUCT_CART, payload: json.data })
          )
          .catch((err) => console.log(err));
      });
  };
};
//Add to cart if userRole='guest'

export const addToGuestCart = (product) => {
  return function (dispatch) {
    //Get the localStorage cart parsed
    let guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
    //Check if guestCart contains objects
    if (guestCart) {
      //If contains previous products push the new one
      guestCart.push(product);
      window.localStorage.setItem('guestCart', JSON.stringify(guestCart));
    }
    //If its empty or the key doesnt exist, initialize a new one
    else {
      let newGuestCart = [product];
      window.localStorage.setItem('guestCart', JSON.stringify(newGuestCart));
    }
  };
};

//Get products if userRole='guest'
export const getGuestProducts = () => {
	return function (dispatch) {
		let guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
		if (guestCart) dispatch({ type: ADD_TO_CART, payload: guestCart })
	}
}

export const deleteGuestProduct=(prodID)=>{
  return function(dispatch){
    let guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
    let productsArray=[]
    if(guestCart){
      for (let i = 0; i < guestCart.length; i++) {
        const prod = guestCart[i];
        if(prod.id!==prodID){
          productsArray.push(prod)
        }
      }
    }
    window.localStorage.setItem('guestCart', JSON.stringify(productsArray));

    dispatch({type:ADD_TO_CART,payload:productsArray})
  }
}

export const get_shopcartsCompleted = () => {
	return function (dispatch) {
		axios.get('http://localhost:3001/shopcart/status/completed')
			.then((json) =>
				dispatch({ type: GET_CART_COMPLETED, payload: json.data }))
	}
}

export const getLibraryProducts = (userId) => {
	let productsWithCategoriesAndTracks = [];
	return function (dispatch) {
		axios.get(`http://localhost:3001/shopcart/user/${userId}/completed`)
			.then(res => {
				res.data.map(cart => {
					cart.products.map(p => {
						axios.get(`http://localhost:3001/products/id/${p.id}`)
							.then(res => productsWithCategoriesAndTracks.push(res.data))
					})
				});
				console.log('productsWithCategoriesAndTracks in action >>> ', productsWithCategoriesAndTracks);
				dispatch({ type: GET_LIBRARY_PRODUCTS, payload: productsWithCategoriesAndTracks });
			})
	}
}    

const clearLocalStorage=()=>{
  window.localStorage.setItem('guestCart',JSON.stringify([]))
  alert('Carrito eliminado!')
}



export const checkLocalCart=(userID)=>{
  var guestCart = JSON.parse(window.localStorage.getItem('guestCart'));
  return function(dispatch){
    if(guestCart.length!==0){
      if (window.confirm('Tiene un carrito pendiente, desea eliminarlo?')){
        clearLocalStorage()
      }

      else{
        axios.get(`http://localhost:3001/shopcart/user/${userID}`).then(res=>{
          for (let i = 0; i < guestCart.length; i++) {
            const prod = guestCart[i];
            axios
            .post(
              `http://localhost:3001/shopcart/${res.data}/product/${prod.id}`
            )
          }
          window.localStorage.setItem('guestCart',JSON.stringify([]))
          alert('Carrito Guardado')
        })
        
      }
    }
  }
}
