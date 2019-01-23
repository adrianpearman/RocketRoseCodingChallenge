import { createStore, applyMiddleware, compose } from 'redux' 
import { createLogger } from 'redux-logger' 
import thunkMiddleware from 'redux-thunk' 
import appReducers from '../reducers' 

const loggerMiddleware = createLogger()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    appReducers, composeEnhancers(
        applyMiddleware(
            thunkMiddleware,
            // loggerMiddleware
        )
    )
)