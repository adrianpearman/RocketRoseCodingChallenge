import React, { Component } from 'react';
import PlottingChart from './PlottingChart'
import DriverInput from './DriverInput'
import DriverDetails from './DriverDetails'
import InputForm from './InputForm'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <h1 className='header'>Delivery Truck Tracker</h1>
        <div className='row'>
          <PlottingChart />
        </div>
        <div className='row mt-5 mb-5'>
          <div className='col-6'>
            <DriverDetails />
          </div>
          <div className='col-6'>
            <DriverInput />
            {/* Commenting out as the functionality for the redux action creator and backend functionality is not completed */}
            {/* <InputForm /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App
