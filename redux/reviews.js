import * as ActionTypes from './ActionTypes';

export const reviews = (state = [], action) => {
    switch (action.type) {
        case ActionTypes.ADD_REVIEW:

            const reviewData = action.payload;
            if(state.reviews) {
                if (state.reviews.filter(review => review.dogId === reviewData.dogId)) {
                    return state;
                }
            }

            reviewData.date = new Date().toISOString();
           // return {...state, reviews: state.reviews.concat(reviewData)};
            return state.concat(reviewData);


        default:
            return state;
      }
};