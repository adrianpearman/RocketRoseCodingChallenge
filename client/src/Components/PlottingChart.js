import React, { Component } from 'react'
// Redux 
import { connect } from 'react-redux'
import { 
    fetchBonusDriverLocation, 
    fetchLegs, 
    fetchDriverLocation, 
    fetchStops, 
    updateDriverLegRoute,
    updateDriverCompletionPercentage 
} from '../redux/actions'

// Charts
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory'

// Styling for the chart
const style = {
    width: '70%',
    height: '70%',
    marginLeft: '15%',
    marginRight: '15%'
}

class PlottingChart extends Component {
    // calling the redux actions to grab the information
    componentDidMount() {
        this.props.fetchLegs()
        this.props.fetchStops()
        this.props.fetchDriverLocation()
    }

    // renders the list of stops from the redux state
    renderPlotList(){
        let stopData = this.props.stops[0]

        if (!stopData){
            return null
        }else{
            // setting the local varibales for the stop list
            let dataX = stopData.map(d => d.x)
            let dataY = stopData.map(d => d.y)

            // creating additional spacing on the chart utilizing minimums
            let smallestX = Math.min(...dataX) - 5
            let largestX = Math.max(...dataX) + 5
            let smallestY = Math.min(...dataY) - 5
            let largestY = Math.max(...dataY) + 5
            
            return(
                <VictoryScatter
                    theme={VictoryTheme.material}
                    domain={{
                        x: [smallestX, largestX],
                        y: [smallestY, largestY]
                    }}
                    labels={(datum) => datum.name}
                    data={stopData}
                    style={{
                        data: {
                            fill: "#c43a31",
                        },
                        labels: {
                            fontSize: 6,
                            padding: 4
                        }
                    }}
                />
            )
        }
    }

    // renders the current drivers location
    renderDriver(){
        // setting local variables for the driver
        let driverLegPercentage = this.props.legProcess
        let driverActiveLeg = this.props.activeLegID
        let stopsArray = this.props.stops[0]
        let startLeg = driverActiveLeg[0]
        let endLeg = driverActiveLeg[1]

        if (this.props.fetchedDriver){
            let currentStartRoute = stopsArray.filter((stop) => {
                return stop.name === startLeg
            })
            let currentEndRoute = stopsArray.filter((stop) => {
                return stop.name === endLeg
            }) 

            let currentRouteCoord = [
                {
                    x: currentStartRoute[0].x, 
                    y: currentStartRoute[0].y
                },
                {
                    x: currentEndRoute[0].x, 
                    y: currentEndRoute[0].y
                }
            ]

            // calculates the position of the driver
            const newCoordinates1 = (array, per) => {
                let x1 = array[0].x
                let x2 = array[1].x
                let y1 = array[0].y
                let y2 = array[1].y
                per = per / 100
                let xN = x1 + (x2 - x1) * per
                let yN = y1 + (y2 - y1) * per
                return [{
                    x: xN,
                    y: yN
                }]
            }

            // return the new position with the current completion percentage
            const data = newCoordinates1(currentRouteCoord, driverLegPercentage)

            return (
                <VictoryScatter
                    theme={VictoryTheme.material}
                    data={data}
                    labels={() => 'Driver'}
                    style={{
                        data: {
                            fill: "#0000ff",
                        },
                        labels: {
                            fontSize: 6,
                            padding: 4
                        }
                    }}
                />
            )
        } else {
            return
        }
    }

    renderBonusDriver(){
        if(!this.state.loadedData){
            return null
        } else {
            return(
                <VictoryScatter 
                    theme={VictoryTheme.material}
                    data={this.state.driverLocation}
                    symbol={'triangleUp'}
                    style={{
                        data: {
                            fill: "#C6FF00",
                        },
                        labels: {
                            fontSize: 6,
                            padding: 8
                        }
                    }}
                />
            )
        }
    }
    
    render(){        
        return(
            <div style={style}>
                <VictoryChart>
                    {this.renderPlotList()}
                    {this.renderDriver()}
                    {/* {this.renderBonusDriver()} */}
                </VictoryChart>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        legs: state.legs,
        stops: state.stops,
        activeLegID: state.driver.activeLegID,
        legProcess: state.driver.legProcess,
        fetchedDriver: state.driver.fetchedDriver,
        fetchedBonusDriver: state.driver.fetchedBonusDriver
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBonusDriverLocation,
        // fetchAllData,
        fetchLegs,
        fetchStops,
        fetchDriverLocation,
        updateDriverLegRoute,
        updateDriverCompletionPercentage
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(PlottingChart)








