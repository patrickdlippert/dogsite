import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dogs } from './dogs';
import { breeds } from './breeds';
import { sponsors } from './sponsors';
import { favorites } from './favorites';
import { reviews }  from './reviews';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            dogs,
            breeds,
            sponsors,
            favorites,
            reviews
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
    persistor.purge();

    return { persistor, store };
}