import * as ActionTypes from './ActionTypes';
import { DOGS } from '../shared/dogs';

export const dogs = (state = { isLoading: true,
                                errMess: null,
                                dogs: DOGS}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DOG:
            const dog = action.payload;

            dog.id = state.dogs.length;
            dog.rating = 0;
            dog.date = new Date().toISOString();
            console.log('New dog created');
            console.log(dog);
            return {...state, dogs: state.dogs.concat(dog)};

        default:
            return state;
      }
};