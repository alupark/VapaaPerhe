import React, { Component } from 'react';
import { connect } from "react-redux";

import './TargetSelector.css';

import { setTarget } from "./actions";

class TargetSelector extends Component {
  render() {
    return (
      <>
        <button onClick={() => this.props.setTarget('me')} className={`target-selector ${this.props.target === 'me' ? 'target-selector__selected' : ''}`}>Minä</button>
        <button onClick={() => this.props.setTarget('both')} className={`target-selector ${this.props.target === 'both' ? 'target-selector__selected' : ''}`}>Yhdessä ❤️</button>
        <button onClick={() => this.props.setTarget('they')} className={`target-selector ${this.props.target === 'they' ? 'target-selector__selected' : ''}`}>Hän</button>
      </>
    );
  }
}

const mapStateToProps = state => {
  return ({ target: state.target });
};

export default connect(
  mapStateToProps,
  { setTarget }
)(TargetSelector);
