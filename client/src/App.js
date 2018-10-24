import React, { Component } from 'react';
import HotelPicker from './containers/hotelPicker';
import 'react-dates/initialize';

class App extends Component {
  render() {
    return (
      <div className="sans-serif">
        <h3 className="f2 lh-copy tc normal">The Best Hotels For You</h3>
        <HotelPicker></HotelPicker>
      </div>
    );
  }
}

export default App;
