import React, { Component } from "react";
import { DateRangePicker } from "react-dates";
import Select from "react-select";
import "react-dates/lib/css/_datepicker.css";
import * as config from "./hotelPicker.config";
import Hotels from "../components/hotels";
import axios from "axios";

export default class HotelPicker extends Component {
  state = {
    startDate: null,
    endDate: null,
    website: null,
    destination: null,
    hotelList: null
  };

  checkDisable = () => {
    const { startDate, endDate, website, destination } = this.state;
    return !!startDate && !!endDate && !!website && !!destination;
  };

  handleWebsiteChange = selectedOption => {
    this.setState({
      website: selectedOption
    });
  };

  handleDestinationChange = selectedOption => {
    this.setState({
      destination: selectedOption
    });
  };

  handleDateChange = ({ startDate, endDate }) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  };

  handleSearch = () => {
    const url = `/api/${
      this.state.website.value
      }/${this.state.destination.value.replace(
        /[ ]/g,
        "%20"
      )}/${this.state.startDate.format("MMDDYY")}/${this.state.endDate.format(
        "MMDDYY"
      )}`;

    axios.get(url).then(res => this.setState({ hotelList: res.data }));
  };

  // "$2,865" => 2865, null => 0
  convertPrice = hotel => {
    let price = hotel.data.nightlyPrice;
    if (price === "") {
      return 0;
    } else {
      return Number(price.replace("$", "").replace(/[,]/g, ""));
    }
  };

  handleSort = flag => {
    let newList = [...this.state.hotelList];
    newList.forEach((el, index) => {
      el = { ...this.state.hotelList[index] };
      el.data = { ...this.state.hotelList[index].data };
    });
    newList.sort((el1, el2) => {
      if (flag) {
        return this.convertPrice(el1) - this.convertPrice(el2);
      } else {
        return this.convertPrice(el2) - this.convertPrice(el1);
      }
    });
    this.setState({ hotelList: newList });
  };

  render() {
    const { website, destination } = this.state;
    const buttonDisable = this.checkDisable();

    let data = null;
    if (this.state.hotelList) {
      if (typeof this.state.hotelList !== "string") {
        data = (
          <div className="flex flex-column items-center">
            <div>
              <button className="f6 link dim br3 ba ph3 pv2 mb2 dib black ma2 shadow-3" onClick={() => this.handleSort(false)}>
                Price High to Low
              </button>
              <button className="f6 link dim br3 ba ph3 pv2 mb2 dib black ma2 shadow-3" onClick={() => this.handleSort(true)}>
                Price Low to High
              </button>
            </div >
            {this.state.hotelList.map((el, index) => {
              return <Hotels key={index} {...el.data} />;
            })}
          </div>
        );
      } else {
        data = <div className="f4 lh-copy tc" >{this.state.hotelList}</div>;
      }
    }
    return (
      <div className="ma3">
        <div className="flex flex-column">
          <div>
            <p className="f4 lh-copy">Please select the website</p>
            <Select
              className="w-30 shadow-3"
              value={website}
              onChange={this.handleWebsiteChange}
              options={config.WEBSITE}
            />
            <p className="f4 lh-copy">Please select the destination</p>
            <Select
              className="w-30 shadow-3"
              value={destination}
              onChange={this.handleDestinationChange}
              options={config.DESTINATION}
            />
          </div>
          <p className="f4 lh-copy">Please select the start and end date</p>
          <div className="i f5 lh-copy mb2">(start: 11/23/2018 or 11/24/2018 | end: 11/25/2018 or 11/26/2018)</div>

          <DateRangePicker
            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) =>
              this.handleDateChange({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </div>
        <button
          className="f6 link dim br3 ba ph3 pv2 mb2 dib black mt2 shadow-3"
          type="button"
          disabled={!buttonDisable}
          onClick={this.handleSearch}
        >
          Search
        </button>
        {data}
      </div>
    );
  }
}
