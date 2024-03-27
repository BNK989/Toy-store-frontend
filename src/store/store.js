import { legacy_createStore as createStore, compose, combineReducers } from 'redux'
import { toyReducer } from './reducers/toy.reducer'

const mainReducer = combineReducers({
    toyModule: toyReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(mainReducer, composeEnhancers())
