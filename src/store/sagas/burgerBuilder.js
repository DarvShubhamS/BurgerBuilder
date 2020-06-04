
import axios from '../../axios-orders'
import { put } from 'redux-saga/effects'
import * as actions from '../action/index'

export function* initIngredientSaga(action) {
    try {
        const res = yield axios.get('https://react-learn-5eadf.firebaseio.com/ingredients.json')

        yield put(actions.setIngredients(res.data))

    }

    catch (err) {
        yield put(actions.fetchIngredientsFail(err))
    }






}