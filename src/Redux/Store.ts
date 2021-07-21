import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import loaderReducer from './Reducers/LoaderReducer'
import homeReducer from './Reducers/HomeReducer';

const persistConfig = {
    key: 'root',
    storage,
};

let rootReducer = combineReducers({
    loaderState: loaderReducer,
    homeState: homeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
    let store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)))
    let persistor = persistStore(store)
    return { store, persistor }
};