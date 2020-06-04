import axios from '../../axios-orders'
import * as actions from '../action/index'
import { put } from 'redux-saga/effects'


export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post(
            "/orders.json?auth=" + action.token,
            action.orderData
        );
        yield put(
            actions.purchaseBurgerSuccess(response.data.name, action.orderData)
        );
    } catch (error) {
        yield put(actions.purchaseBurgerFailed(error));
    }
}

export function* fetchordersSaga(action) {

    yield put(actions.fetchOrderStart())
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"'
    try {
        let res = yield axios.get('/orders.json' + queryParams)

        const fetchOrders = []
        for (let key in res.data) {

            fetchOrders.push({
                ...res.data[key],
                id: key
            })
        }
        yield put(actions.fetchOrderSuccess(fetchOrders))



    }
    catch (err) {
        yield put(actions.fetchOrderfail(err))
    }



}


