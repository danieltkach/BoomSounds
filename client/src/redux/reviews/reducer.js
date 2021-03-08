import {  FETCH_REVIEW, SET_REVIEW, 
} from './actions.js';

const initialState = {
    reviews:[]
}

const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_REVIEW:
            return {
                ...state,
                reviews: action.payload,
            }
        case SET_REVIEW:
            return {
                ...state,
               reviews:  action.payload
            }
        default:
            return state;
    }
}

export default reviewsReducer;