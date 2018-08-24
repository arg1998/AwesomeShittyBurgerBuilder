import * as actionTypes from '../actions/actionTypes';
import _ from 'lodash';

const initialState = {
    token: null,
    userID: null,
    error: null,
    loading: false
};

export default (oldState = initialState, action) => {
    const newState = _.cloneDeep(oldState);

    switch (action.type) {
        case actionTypes.AUTH_START:
            newState.error = null;
            newState.loading = true;
            break;

        case actionTypes.AUTH_SUCCESS:
            newState.token = action.token;
            newState.userID = action.userID;
            newState.error = null;
            newState.loading = false;
            break;

        case actionTypes.AUTH_FAIL:
            newState.token = null;
            newState.userID = null;
            newState.error = action.error;
            newState.loading = false;
            break;

        case actionTypes.LOGOUT:
            newState.token = null;
            newState.userID = null;
            newState.error = null;
            newState.loading = false;
            break;

        default:
            break;
    }

    return newState;
};
