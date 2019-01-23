import React from 'react' 
import { connect } from 'react-redux'
import { Field, reduxForm, SubmissionError } from 'redux-form' 
import { updatedBonusDriverLocation } from '../redux/actions'

const submitForm = ({ x_coordinate = '', y_coordinate='' }) => {
    let error = {}
    let isError = false

    if (x_coordinate.trim() === ''){
        error.firstname = 'Required'
        isError = true
    }

    if (y_coordinate.trim() === ''){
        error.lastname = 'Required'
        isError = true
    }

    if(isError){
        throw new SubmissionError(error)
    }else{
        const dataObject = {
            x: x_coordinate,
            y: y_coordinate
        }
        updatedBonusDriverLocation(dataObject)
    }
}

const renderField = ({ type, label, input, meta: { touched, error } }) => {
    return(
        <div>
            <label>{label}</label>{touched && error && <span> - {error}</span>}
            <br />
            <input {...input} type={type} />
        </div>
    )
}

const InputFormMarkUp = ({ handleSubmit }) => {
    return (
        <div>
            <h3>Update Driver Location</h3>
            <form onSubmit={handleSubmit(submitForm)}>
                <Field name='x_coordinate' label='X Coordinate' type='text' component={renderField} />
                <Field name='y_coordinate' label='Y Coordinate' type='text' component={renderField} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

const InputForm = reduxForm({
    form: 'location_update_form'
})(InputFormMarkUp)

const mapStateToProps = (state) => {
    return{
        bonusDriverLegId: state.driver.activeLegID,
        legProcess: state.driver.legProcess
    }
}

export default connect(mapStateToProps)(InputForm)