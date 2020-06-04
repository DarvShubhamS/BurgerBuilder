import { put, delay, call } from 'redux-saga/effects'
import * as actions from '../action/index'
import axios from 'axios'
//generators
export function* logoutSage(action) {
    //can also use call
    yield call([localStorage, "removeItem"], "token")
    // yield localStorage.removeItem('token')
    yield localStorage.removeItem('ExpireDate')
    yield localStorage.removeItem('userId')
    yield put(actions.logoutSucced())
}

export function* checkAuthTimeOutSaga(action) {
    yield delay(action.expirationTime * 1000)
    yield put(actions.logout())

    // return dispatch => {
    //     setTimeout(() => {
    //         dispatch(logout())
    //     }, expirationTime * 1000);
    // }

}

export function* authUserSaga(action) {
    yield put(actions.authStart())
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrMe6sDLLm-9O_UULBARgtqg6-NPJdmB4'
    if (!action.isSignUp) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrMe6sDLLm-9O_UULBARgtqg6-NPJdmB4'
    }

    try {
        const Response = yield axios.post(url, authData)
        console.log(Response)
        yield localStorage.setItem('token', Response.data.idToken)
        const ExpirationDate = yield new Date(new Date().getTime() + Response.data.expiresIn * 1000)
        yield localStorage.setItem('ExpireDate', ExpirationDate)
        yield localStorage.setItem('userId', Response.data.localId)
        yield put(actions.authSuccess(Response.data.idToken, Response.data.localId))
        yield put(actions.checkAuthTimeOut(Response.data.expiresIn))
    }
    catch (err) {
        console.log(err)
        yield put(actions.authFail(err.response.data.error))
    }

}

export function* authCheckSaga(action) {

    const token = yield localStorage.getItem('token')
    if (!token) {
        yield put(actions.logout())

    }
    else {
        const ExpirationDate = yield new Date(localStorage.getItem('ExpireDate'))
        if (ExpirationDate <= new Date()) {
            yield put(actions.logout())
        }
        else {
            const userId = yield localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.checkAuthTimeOut((ExpirationDate.getTime() - new Date().getTime()) / 1000))
        }

    }

}



