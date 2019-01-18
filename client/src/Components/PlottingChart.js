import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllData } from '../redux/actions'
import { VictoryLine, VictoryChart, VictoryScatter, VictoryTheme } from 'victory'
import {store} from '../redux/store'

class PlottingChart extends Component {
    constructor(props){
        super(props)
        this.state={
            data: null,
            smallestX: null,
            largestX: null,
            smallestY: null,
            largestY: null,
            driverLocation: null,
            loadedData: false
        }
    }

    componentDidMount() {
        this.props.fetchAllData()
    }

    componentWillReceiveProps(){
        const driverData = this.props.driver
        const stopData = this.props.stops[0]

        // Setting the content based on the received driver data
        if(!driverData){
            console.log('no driver data')
        } else {
            const data = []
            data.push(this.props.driver)
            this.setState({
                driverLocation: data
            })
        }

        // Setting the content based on the received stop data
        if (!stopData){
            console.log('no data')
        } else {
            console.log('data')
            const dataX = stopData.map(d => d.x)
            const dataY = stopData.map(d => d.y)
            const smallestX = Math.min(...dataX) - 10
            const largestX = Math.max(...dataX) + 10
            const smallestY = Math.min(...dataY) - 10
            const largestY = Math.max(...dataY) + 10

    
            this.setState({
                data: stopData,
                smallestX: smallestX,
                largestX: largestX,
                smallestY: smallestY,
                largestY: largestY,
                loadedData: true
            })
        }
    }

    renderPlotList(){
        if(!this.state.loadedData){
            return null
        }else{
            return(
                <VictoryScatter
                    theme={VictoryTheme.material}
                    domain={{
                        x: [this.state.smallestX, this.state.largestX],
                        y: [this.state.smallestY, this.state.largestY]
                    }}
                    labels={(datum) => datum.name}
                    data={this.state.data}
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

    renderDriver(){
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
            <div>
                <VictoryChart>
                    {this.renderPlotList()}
                    {this.renderDriver()}
                </VictoryChart>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        legs: state.legs,
        stops: state.stops,
        driver: state.driver
    }
}

export default connect(
    mapStateToProps, { 
        fetchAllData
    })(PlottingChart)







