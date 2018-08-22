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

export const purchaseBurger = orderData => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json', orderData)
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

export const fetchOrdersAsync = () => {
    return dispatch => {
        dispatch(fecthOrderStart());

        axios
            .get('/orders.json')
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
