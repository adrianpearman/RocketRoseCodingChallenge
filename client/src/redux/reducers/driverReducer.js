const initialState = {
    x: '', 
    y: '', 
    activeLegID: 'AB', 
    legProcess: 0,
    fetchedDriver: false,
    fetchedBonusDriver: false
}

export const driverReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DRIVER':
            return {
                ...state,
                activeLegID: action.payload.activeLegID,
                legProcess: action.payload.legProcess,
                fetchedDriver: true
            } 
        case 'FETCH_BONUS_DRIVER':
            return {
                ...state,
                x: action.payload.x,
                y: action.payload.y,
                fetchedBonusDriver: true
            }
        case 'UPDATE_DRIVER_LEG':
            return{
                ...state,
                activeLegID: action.payload,
                legProcess: 0
            }
        case 'UPDATE_DRIVER_PERCENTAGE':
            return{
                ...state,
                legProcess: action.payload
            }
        default:
            return state
    }
}