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
    axios.get('http://localhost:5001/driver/currentLocation')
        .then((response) => {
            dispatch({ type: 'FETCH_DRIVER', payload: response.data })
        })
        .catch(err => console.log(err))
}

export const fetchAllData = () => async (dispatch, getState) => {
    await dispatch(fetchLegs())
    await dispatch(fetchStops())
    await dispatch(fetchDriverLocation())
}