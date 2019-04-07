import React, { Component } from 'react';
import { connect } from "react-redux";

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class Income extends Component {
  render() {
    const options = {
      xAxis: {
        plotLines: [{
          color: 'red',
          dashStyle: 'ShortDot',
          value: this.props.preBaby,
          width: 1,
          label: {
            text: '👶',
            align: 'left',
            textAlign: 'center',
            rotation: '0',
            verticalAlign: 'top',
            x: -1,
            y: 35,
            style: {
              fontSize: '300%'
            }
          },
        }]
      },
      series: [
        {
          name: "Vain työtulo",
          data: this.props.cumulativeIncome.salaryIncome
        },
        {
          name: "Vapaa perhe",
          data: this.props.cumulativeIncome.familyBenefitIncome
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

const mapStateToProps = state => ({
  cumulativeIncome: state.cumulativeIncome,
  preBaby: state.preBaby
});

export default connect(
  mapStateToProps,
  {}
)(Income);
