import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
    },
    totalPrice: 3,
    error: false,
    loading: true
};

const INGREDIENT_PRICES = {
    initTotalPrice: 3,
    bacon: 0.9,
    cheese: 0.7,
    meat: 1.5,
    salad: 0.3
};

export default (oldState = initialState, action) => {
    const clonedState = _.cloneDeep(oldState);

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            clonedState.ingredients[action.ingName] += 1;
            clonedState.totalPrice =
                oldState.totalPrice + INGREDIENT_PRICES[action.ingName];
            break;

        case actionTypes.DEL_INGREDIENT:
            clonedState.ingredients[action.ingName] -= 1;
            clonedState.totalPrice =
                oldState.totalPrice - INGREDIENT_PRICES[action.ingName];
            break;

        case actionTypes.INIT_INGREDIENT:
            clonedState.ingredients = action.value;
            clonedState.totalPrice = INGREDIENT_PRICES.initTotalPrice;
            for (let key in clonedState.ingredients) {
                clonedState.totalPrice +=
                    clonedState.ingredients[key] * INGREDIENT_PRICES[key];
            }
            clonedState.loading = false;
            clonedState.error = false;
            break;

        case actionTypes.FETCH_FAILED:
            clonedState.loading = false;
            clonedState.error = true;
            break;

        default:
            break;
    }

    return clonedState;
};
