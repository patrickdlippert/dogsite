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
            dog.numRatings = 0;
            dog.date = new Date().toISOString();
            console.log('New dog created');
            console.log(dog);
            return {...state, dogs: state.dogs.concat(dog)};

        case ActionTypes.UPDATE_DOG_RATING:
            const ratingpair = action.payload; // ratingpair has the dog's id and a new rating being submitted
            const index = state.dogs.findIndex(dog => dog.id === ratingpair.id); // find index of the dog
            const newArray = [...state.dogs]; //making a new array
            //alert("index: " + index + " new rating: " + ratingpair.rating);

            // Update the state's rating with a weighted average and then increment the number of rating votes
            newArray[index].rating = (newArray[index].rating * newArray[index].numRatings + ratingpair.rating)/(newArray[index].numRatings + 1);  //changing value in the new array
            newArray[index].numRatings++;
            return {...state, dogs: newArray }; //reassingning dogs to new array


        default:
            return state;
      }
};