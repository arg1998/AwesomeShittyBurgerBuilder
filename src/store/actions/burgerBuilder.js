import * as actionTypes from './actionTypes';
import axios from '../../axios-config-instance';

export const addIngredient = ingName => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingName
    };
};
export const removeIngredient = ingName => {
    return {
        type: actionTypes.DEL_INGREDIENT,
        ingName
    };
};

const setIngerdient = ingredients => {
    return {
        type: actionTypes.INIT_INGREDIENT,
        value: ingredients
    };
};
const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    };
};

export const fetchIngredientAsync = () => {
    return dispatch => {
        axios
            .get('/ingredients.json')
            .then(response => {
                console.log(response.data);
                dispatch(setIngerdient(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(fetchIngredientFailed());
            });
    };
};
