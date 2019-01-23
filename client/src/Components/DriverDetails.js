import React, { Component } from 'react' 
import { connect } from 'react-redux'

class DriverDetails extends Component{
    renderDistance(){
        if (this.props.fetchedDriver) {
            const startLeg = this.props.stops.filter((stop) => {
                return stop.name === this.props.activeLegID[0]
            })
            const endLeg = this.props.stops.filter((stop) => {
                return stop.name === this.props.activeLegID[1]
            })

            const distance = (start, end) => {
                const CoOrd1 = {
                    x: start[0].x,
                    y: start[0].y 
                }

                const CoOrd2 = {
                    x: end[0].x,
                    y: end[0].y 
                }
                
                const calculateDistance = (CoOrd1, CoOrd2) => {
                    const x2 = CoOrd2.x - CoOrd1.x 
                    const y2 = CoOrd2.y - CoOrd1.y 

                    return Math.sqrt(Math.pow(x2,2) + Math.pow(y2,2)).toFixed(2)
                }

                const distance = calculateDistance(CoOrd1, CoOrd2)

                return distance
            }
           
            return distance(startLeg, endLeg)
        }
    }

    renderSpeedLimit(){
        if(this.props.fetchedDriver){
            const speedLimit = this.props.legs.filter((leg) => {
                return leg.legID === this.props.activeLegID
            })
            
            return speedLimit[0].speedLimit
        }
    }

    renderCompletionTime(){
        if (this.props.fetchedDriver) {
            const speedLimit = this.renderSpeedLimit()
            const renderDistance = this.renderDistance()
            const percentage = this.props.legProcess / 100

            const time = (renderDistance / speedLimit * 60) - ((renderDistance / speedLimit * 60) * percentage).toFixed(2)
            // console.log(time)
            return time > 0 ? <span>{time} minutes</span> : <span className='green'>Route Completed</span>
        }
    }

    renderEstimatedCompletion() {
        return (
            <div>
                <h5>Current Route: <span>{this.props.activeLegID}</span></h5>
                <br />
                <h5>Route Distance: <span>{this.renderDistance()}km</span></h5>
                <br />
                <h5>Route Speed Limit: <span>{this.renderSpeedLimit()}km/h</span></h5>
                <br />
                <h5>
                    Percentage Left to Complete Route: 
                    <span 
                        className={this.props.legProcess >= 100 ? 'green' : ''}
                    >
                     {this.props.legProcess}%
                    </span>
                </h5>
                <br />
                <h5>Estimated Time To Finish: {this.renderCompletionTime()}</h5>
            </div>
        )
    }

    render(){
        return(
            <div>
                <h3>Driver Details</h3>
                {this.renderEstimatedCompletion()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        legs: state.legs[0],
        stops: state.stops[0],
        activeLegID: state.driver.activeLegID,
        legProcess: state.driver.legProcess,
        fetchedDriver: state.driver.fetchedDriver
    }
}

export default connect(mapStateToProps)(DriverDetails)