import React, { Component } from "react";
import { connect } from "react-redux";
// import {  } from "antd";
import Trial from "./Trial";

class Experiment extends Component {
  render() {
    console.log("Experiment render");
    const { condition, trial } = this.props;

    let eggFallPercentage;
    if (condition === 1) {
      eggFallPercentage = 80;
    } else if (condition === 2) {
      eggFallPercentage = trial * 20;
    }

    return (
      <div>
        <Trial eggFallPercentage={eggFallPercentage} />{" "}
      </div>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    condition: state.register.condition,
    trial: state.experiment.trial
  };
}

export default connect(
  mapStateToProps,
  null
)(Experiment);
