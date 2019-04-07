import React, { Component } from 'react';
import { connect } from "react-redux";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Income extends Component {
  render() {
    const options = {
      title: "FOOBAR",
      series: [
        {
          name: "Työtulo",
          data: this.props.salaryIncome
        },
        {
          name: "Äitiysraha",
          data: this.props.familyBenefitIncome
        }
      ]
    }

    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    );
  }
}

const mapStateToProps = state => state.cumulativeIncome;

export default connect(
  mapStateToProps,
  {}
)(Income);
