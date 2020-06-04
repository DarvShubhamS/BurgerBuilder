import * as actionType from '../action/actionTypes'
import { updateObject } from './utilty'
const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false



}
const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}


const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientsName]: state.ingredients[action.ingredientsName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientsName],
                building: true
            }
            return updateObject(state, updatedState)

        case actionType.REMOVE_INGREDIENT:
            return {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientsName]: state.ingredients[action.ingredientsName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientsName]
            }
        case actionType.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false

            }
        case actionType.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }


        default:
            return state





    }




}

export default Reducer