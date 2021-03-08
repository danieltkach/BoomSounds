
import { DELETE_CATEGORY  , ADD_CATEGORY} from '../action-types'
import {GET_CATEGORIES , ADD_CATEGORY_PRRODUCT }from './actions'

const initialState = {
    categories : []
}


const categoriesReducer=  (state = initialState , action) => {
    switch(action.type) {
        case GET_CATEGORIES: {
            return{
                ...state,
                categories : action.payload
            }
        }
        case DELETE_CATEGORY:{
            return{
                ...state,
            }
        }

        case ADD_CATEGORY_PRRODUCT:{
            return{
                ...state
            }
        }

        case ADD_CATEGORY:{
            return{
                ...state,
                categories: [...state.categories , action.payload]
            }
        }
        
        default: return state
    }

}

export default categoriesReducer;