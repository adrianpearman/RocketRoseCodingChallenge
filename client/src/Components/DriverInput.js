import React, { Component } from 'react'
import { connect } from 'react-redux' 
import {
    updateDriverLegRoute,
    updateDriverCompletionPercentage
} from '../redux/actions'


class DriverInput extends Component {
    renderStopList() {
        if (this.props.fetchedDriver) {
            let stopNames = this.props.stops[0].map((stop) => {
                return stop.name
            })
            let elementArray = []
            for (let index = 0; index < stopNames.length; index++) {
                const element = `${stopNames[index]}${stopNames[index + 1]}`;
                elementArray.push(element)
            }
            elementArray.pop()

            let elementList = elementArray.map((element, index) => {
                return <option key={index} value={element}>{element}</option>
            })

            return (
                <div className='mb-3'>
                    <select
                        value={this.props.activeLegID}
                        onChange={this.props.updateDriverLegRoute}
                    >
                        {elementList}
                    </select>
                </div>
            )
        }
    }

    renderSlider() {
        return (
            <div className='mb-3'>
                <input
                    type="range"
                    id="percentage"
                    name="Progreesion Percentage"
                    min="0"
                    max="100"
                    value={this.props.legProcess}
                    onChange={this.props.updateDriverCompletionPercentage}
                    step="1"
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                <h3>Please Select a Route</h3>
                {this.renderStopList()}
                <h3>Toggle Completion Percentage</h3>
                {this.renderSlider()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stops: state.stops,
        activeLegID: state.driver.activeLegID,
        legProcess: state.driver.legProcess,
        fetchedDriver: state.driver.fetchedDriver
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDriverLegRoute,
        updateDriverCompletionPercentage
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(DriverInput)