import React from 'react'
import axios from 'axios'

import Day from './Day'

class App extends React.Component {
  constructor() {
    super();

    this.getPosition = this.getPosition.bind(this);
    this.getForecast = this.getForecast.bind(this);

    // getInitialState
    this.state = {
      coords: {},
      forecast: {},
    }
  }
  componentWillMount() {
    const timestamp = parseInt(localStorage.getItem('timestamp'), 10);
    const forecast = localStorage.getItem('forecast');

    if (timestamp + 600000 > Date.now() && forecast) {
      this.setState({
        forecast: JSON.parse(forecast)
      })
    } else {
      this.getPosition();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('timestamp', JSON.stringify(Date.now()));
    localStorage.setItem('forecast', JSON.stringify(nextState.forecast));
  }

  getPosition() {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.getForecast(pos.coords.latitude, pos.coords.longitude)
        .then(response => {
          this.setState({
            coords: pos.coords,
            forecast: response.data.forecast.simpleforecast.forecastday,
            timestamp: Date.now(),
          })
         });
    });
  }

  getForecast(lat, lon) {
    // TODO: Store the api key...somewhere
    const api_key = 'CHANGEME';
    const uri = `http://api.wunderground.com/api/${api_key}/forecast/q/${lat},${lon}.json`;

    return axios.get(uri);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="twelve columns headline">Temp!</h1>
        </div>
        <div className="row">
          {
            Object
              .keys(this.state.forecast)
              .map(key => <Day 
                key={key}
                index={key}
                details={this.state.forecast[key]}
              />)
          }
        </div>
      </div>
    )
  }
}

export default App;
