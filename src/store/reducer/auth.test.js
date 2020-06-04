import reducer from './auth'
import * as actiontypes from '../action/actionTypes'

describe('Auth Reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        })
    })
    it('should store upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirect: '/'
        }, {
            type: actiontypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-id'

        })).toEqual({
            token: 'some-token',
            userId: 'some-id',
            error: null,
            loading: false,
            authRedirect: '/'


        })
    })
})