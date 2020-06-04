import * as ActionTypes from '../action/actionTypes'

export const authStart = () => {
    return {
        type: ActionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: ActionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}
export const authFail = (err) => {
    return {
        type: ActionTypes.AUTH_FAIL,
        error: err
    }
}
export const logout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('ExpireDate')
    // localStorage.removeItem('userId')
    return {

        type: ActionTypes.AUTH_INITIATE_LOGOUT,

    }
}

export const logoutSucced = () => {
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}



export const checkAuthTimeOut = (expirationTime) => {
    return {
        type: ActionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    }
}


//saga way being dispatched passing data and type to our saga middleware
export const auth = (email, password, isSignUp) => {
    return {
        type: ActionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp

    }
}


export const setAuthRedirect = (path) => {
    return {
        type: ActionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


export const authCheckState = () => {
    return {
        type: ActionTypes.AUTH_CHECK_STATE
    }
}