export const stopReducer = (state = [], action) => {
    switch(action.type){
        case 'FETCH_STOPS':
            return [
                ...state, 
                action.payload
            ]
        default: 
            return state
    }
}