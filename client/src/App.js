import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  componentDidMount(){
    // axios.get('http://localhost:3001/stops')
    axios.get('/stops')
      .then((response) => {
        console.log('----STOPS----')
        console.log(response.data)
      })
      .catch(err => console.log(err))
    axios.get('/legs')
      .then((response) => {
        console.log('----LEGS----')
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    );
  }
}

export default App;
