export const legReducer = (state = [], action) => {
    switch(action.type){
        case 'FETCH_LEGS':
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}