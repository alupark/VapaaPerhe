import React, { Component } from 'react';
import { connect } from "react-redux";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { setSalary } from "./actions";

class Salary extends Component {
  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const WithTooltip = createSliderWithTooltip(Slider);

    const currencyFormatter = new Intl.NumberFormat('fi-FI', {
      style: 'currency',
      currency: 'EUR',
      maximumSignificantDigits: 2
    });

    return (
      <>
        <WithTooltip
          min={0}
          max={100000}
          step={1000}
          defaultValue={this.props.salary}
          tipFormatter={value => currencyFormatter.format(value)}
          onChange={this.props.setSalary} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return ({ salary: state.salary });
};

export default connect(
  mapStateToProps,
  { setSalary }
)(Salary);
