import * as ActionTypes from './ActionTypes';

export const postDog = (image, name, breed, description) => dispatch => {
    const newDog = {
        image,
        name,
        breed,
        description
    };

    setTimeout(() => {
        dispatch(addDog(newDog));
    }, 1000);
};

export const addDog = dog => ({
    type: ActionTypes.ADD_DOG,
    payload: dog
});