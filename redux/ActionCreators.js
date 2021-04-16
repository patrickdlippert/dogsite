import * as ActionTypes from './ActionTypes';

export const postDog = (image, name, breed, description, enterContest) => dispatch => {
    const newDog = {
        image,
        name,
        breed,
        description,
        enterContest
    };

    setTimeout(() => {
        dispatch(addDog(newDog));
    }, 1000);
};

export const addDog = dog => ({
    type: ActionTypes.ADD_DOG,
    payload: dog
});

export const postDogRating = (id, rating) => dispatch => {
    const newRating = {
        id,
        rating
    };

    setTimeout(() => {
        dispatch(updateDogRating(newRating));
    }, 1000);
};

export const updateDogRating = ratingpair => ({
    type: ActionTypes.UPDATE_DOG_RATING,
    payload: ratingpair
});


export const postFavorite = dogId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(dogId));
    }, 1000);
};

export const addFavorite = dogId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dogId
});

export const deleteFavorite = dogId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dogId
})


export const postReview = (dogId, rating) => dispatch => {
    const newReview = {
        dogId,
        rating
    };
    setTimeout(() => {
        dispatch(addReview(newReview));
    }, 1000);
};

export const addReview = reviewData => ({
    type: ActionTypes.ADD_REVIEW,
    payload: reviewData
});