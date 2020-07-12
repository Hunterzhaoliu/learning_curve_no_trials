import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import screenfull from "screenfull";
import "./start.css";

class Start extends Component {
  onClick = e => {
    this.props.startExperiment();
    if (screenfull.isEnabled) {
      screenfull.request(document.documentElement);
    }
  };

  render() {
    return (
      <button className="button-main button-start" onClick={this.onClick}>
        Start
      </button>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    startExperiment: () => {
      registerDispatchers.startExperiment();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Start);
