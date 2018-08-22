import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

export default (oldState = initialState, action) => {
    const newState = _.cloneDeep(oldState);

    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            newState.purchased = false;
            break;

        case actionTypes.PURCHASE_START:
            newState.loading = true;
            break;

        case actionTypes.PURCHASE_SUCCESS:
            newState.loading = false;
            newState.purchased = true;
            newState.orders.push({ ...action.orderData, id: action.orderID });
            break;

        case actionTypes.PURCAHSE_FAIL:
            newState.loading = false;
            break;

        case actionTypes.FETCH_ORDER_START:
            newState.loading = true;
            break;
        case actionTypes.FETCH_ORDER_SUCCESS:
            newState.loading = false;
            newState.orders = action.orders;
            break;
        case actionTypes.FETCH_ORDER_FAIL:
            newState.loading = false;
            break;

        default:
            break;
    }

    return newState;
};
