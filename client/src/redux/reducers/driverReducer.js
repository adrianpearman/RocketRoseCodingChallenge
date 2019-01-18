export const driverReducer = (state = {x: '', y: ''}, action) => {
    switch(action.type){
        case 'FETCH_DRIVER':
            return state.x = action.payload.x, state.y = action.payload.y 
        default:
            return state
    }
}