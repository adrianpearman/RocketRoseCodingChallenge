import { combineReducers } from 'redux'

import { legReducer } from './legReducer'
import { stopReducer } from './stopReducer'
import { driverReducer } from './driverReducer'

const todoApp = combineReducers({
    legs: legReducer,
    stops: stopReducer,
    driver: driverReducer
})

export default todoApp