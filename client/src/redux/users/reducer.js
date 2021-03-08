import { act } from '@testing-library/react';
import { SET_USER, SET_SHOPCART, SET_USER_ROLE,SALE_CART, GET_USERS,CANCEL_CART , PROMOTE 
        ,DEMOTE , BAN, GET_USER} from '../action-types';
import {GET_CANCEL_CART,GET_SALE_CART, FETCH_ALL_SHOPCARTS} from "./actions"
const initialState = {
  userID: null,
  userShopcart: null,
  userRole: 'guest',
  users : [],
  shopcartSt: [],
  user : []

};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER: {
			return {
				...state,
				userID: action.payload,
			};
		}
		case SET_SHOPCART: {
			return {
				...state,
				userShopcart: action.payload,
			};
		}
		case SET_USER_ROLE: {
			return {
				...state,
				userRole: action.payload,
			}
		}
		case SALE_CART: {
			return {
				...state,
				userShopcart: parseInt(action.payload),
			};
		}
		case CANCEL_CART: {
			console.log("us: ", action.payload)
			return {
				...state,
				userShopcart: action.payload
			}
		}

    case GET_USERS:{
      return{
        ...state,
        users: action.payload
      }
    }

    case GET_USER:{
      return{
        ...state,
        user: action.payload
      }
    }

    case PROMOTE :{
      return{
        ...state,
        userRole: action.payload
      }
    }

    case DEMOTE :{
      return{
        ...state,
        userRole: 'user'
      }
    }

    case BAN :{
      return{
        ...state,
        userRole: 'banned'
      }
    }
    case FETCH_ALL_SHOPCARTS: {
      console.log(action.payload)
      return{
        ...state,
        shopcartSt: action.payload
      }
    }

    case GET_SALE_CART: {
      return{
        ...state,
        shopcartSt:action.payload
      }
    }
    case GET_CANCEL_CART:{
      console.log("GET_CANCEL_CART: ",action.payload)
      return{
        ...state,
        shopcartSt: action.payload
      }
    }
    
    
    default: {
      return state;
    }
	}
};

export default userReducer;
