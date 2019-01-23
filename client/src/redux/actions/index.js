import axios from "axios";

export const fetchLegs = () => (dispatch) => {
    axios.get('http://localhost:5001/legs')
    .then((response) => {
        dispatch({ type: 'FETCH_LEGS', payload: response.data })
    })
    .catch(err => console.log(err))
}
    
export const fetchStops = () => (dispatch) => {
    axios.get('http://localhost:5001/stops')
    .then((response) => {
        dispatch({ type: 'FETCH_STOPS', payload: response.data })
    })
    .catch(err => console.log(err))
}

export const fetchDriverLocation = () => (dispatch) => {
    axios.get('http://localhost:5001/driver')
        .then((response) => {
            dispatch({ type: 'FETCH_DRIVER', payload: response.data })
            // console.log(response.data)
        })
        .catch(err => console.log(err))
}

export const fetchBonusDriverLocation = () => (dispatch) => {
    axios.get('http://localhost:5001/bonusDriver/currentLocation')
    .then((response) => {
            dispatch({ type: 'FETCH_BONUS_DRIVER', payload: response.data })
        })
        .catch(err => console.log(err))
    console.log(dispatch)
}

export const updateDriverLegRoute = (data) => {
    return { 
        type: 'UPDATE_DRIVER_LEG', 
        payload: data.target.value 
    }
}

export const updateDriverCompletionPercentage = (data) => {
    return {
        type: 'UPDATE_DRIVER_PERCENTAGE',
        payload: data.target.value
    }
}

export const updatedBonusDriverLocation = (data) => {
    // console.log(data)
    axios.post('http://localhost:5001/bonusDriver/currentLocation', data)
    .then((response) => {
        console.log(response)
        console.log(data)
        // console.log(response)
        return { type: 'FETCH_BONUS_DRIVER', payload: response }
    })
    .catch(err => console.log(err))
}

