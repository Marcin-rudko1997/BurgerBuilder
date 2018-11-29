import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('shoud return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    })

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-text',
            userId: '1'
        })).toEqual(
            {
                token: 'some-text',
                userId: '1',
                error: null,
                loading: false,
                authRedirectPath: '/',
            })
    })
})