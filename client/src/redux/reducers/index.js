import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form' 

import { legReducer } from './legReducer'
import { stopReducer } from './stopReducer'
import { driverReducer } from './driverReducer'

const todoApp = combineReducers({
    form: formReducer,
    legs: legReducer,
    stops: stopReducer,
    driver: driverReducer
})

export default todoApp