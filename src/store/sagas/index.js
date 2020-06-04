import { takeEvery } from 'redux-saga/effects'
import { logoutSage, checkAuthTimeOutSaga, authUserSaga, authCheckSaga } from './auth'
import { initIngredientSaga } from './burgerBuilder'
import { purchaseBurgerSaga, fetchordersSaga } from './order'
import * as actionTypes from '../action/actionTypes'
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSage)
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeOutSaga)
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga)
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckSaga)

}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGS, initIngredientSaga)
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDER, fetchordersSaga);
}