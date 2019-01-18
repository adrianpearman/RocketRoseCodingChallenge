import { createStore, applyMiddleware } from 'redux' 
import { createLogger } from 'redux-logger' 
import thunkMiddleware from 'redux-thunk' 
import appReducers from '../reducers' 

const loggerMiddleware = createLogger()

export const store = createStore(
    appReducers,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
)