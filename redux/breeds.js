import * as ActionTypes from './ActionTypes';
import { BREEDS } from '../shared/breeds';

export const breeds = (state = { isLoading: true,
                                    errMess: null,
                                    breeds: BREEDS}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_BREEDS:
            return {...state, isLoading: false, errMess: null, breeds: action.payload};

        case ActionTypes.BREEDS_LOADING:
            return {...state, isLoading: true, errMess: null, breeds: []}

        case ActionTypes.BREEDS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};