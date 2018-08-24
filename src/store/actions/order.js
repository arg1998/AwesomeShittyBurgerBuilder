import * as actionTypes from './actionTypes';
import axios from '../../axios-config-instance';

const purchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_SUCCESS,
        orderID: id,
        orderData
    };
};

const purchaseFail = error => {
    return {
        type: actionTypes.PURCAHSE_FAIL,
        error
    };
};

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_START
});

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post(`/orders.json?auth=${token}`, orderData)
            .then(res => {
                dispatch(purchaseSuccess(res.data.name, orderData));
            })
            .catch(err => {
                dispatch(purchaseFail(err));
            });
    };
};

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

const fecthOrderStart = () => ({
    type: actionTypes.FETCH_ORDER_START
});

const fecthOrderSuccess = orders => ({
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders
});

const fecthOrderFail = error => ({
    type: actionTypes.FETCH_ORDER_FAIL,
    error
});

export const fetchOrdersAsync = (token, userID) => {
    return dispatch => {
        dispatch(fecthOrderStart());

        const postURL = `/orders.json?auth=${token}&orderBy="userID"&equalTo="${userID}"`;

        axios
            .get(postURL)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                dispatch(fecthOrderSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fecthOrderFail(err));
            });
    };
};
