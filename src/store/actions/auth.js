import * as actionTypes from './actionTypes';
import axios from 'axios';

const saveToLocalStorage = (token, exp, userId) => {
    const expDate = new Date(new Date().getTime() + exp * 1000);
    localStorage.setItem('token', token);
    localStorage.setItem('userID', userId);
    localStorage.setItem('expirationDate', expDate);
};

const removeFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
};

const authStart = () => ({
    type: actionTypes.AUTH_START
});

const authSuccess = (token, userID) => ({
    type: actionTypes.AUTH_SUCCESS,
    token,
    userID
});

const authFail = error => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const logOut = () => {
    removeFromLocalStorage();
    return {
        type: actionTypes.LOGOUT
    };
};

const checkAuthExpiration = timeout => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, timeout * 1000);
    };
};

export const authenticateAsync = (email, password, isLoggingIn) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAYRjbay6vnjRsEZi8_X5lOsKlIvAw6iEc';

        if (isLoggingIn) {
            url =
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAYRjbay6vnjRsEZi8_X5lOsKlIvAw6iEc';
        }

        axios
            .post(url, authData)
            .then(res => {
                saveToLocalStorage(
                    res.data.idToken,
                    res.data.expiresIn,
                    res.data.localId
                );
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthExpiration(res.data.expiresIn));
            })
            .catch(err => dispatch(authFail(err.response.data.error)));
    };
};

export const checkLocalAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logOut());
        } else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (expDate > new Date()) {
                const uid = localStorage.getItem('token');
                dispatch(authSuccess(token, uid));
                dispatch(
                    checkAuthExpiration(
                        (expDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            } else {
                dispatch(logOut());
            }
        }
    };
};
