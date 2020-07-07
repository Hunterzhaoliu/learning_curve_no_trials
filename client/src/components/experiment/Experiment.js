import React, { Component } from "react";
import { connect } from "react-redux";
// import {  } from "antd";
import Trial from "./Trial";
import Summary from "./Summary";
// import "./experiment.css";

class Experiment extends Component {
  render() {
    const { condition, trial, treeChoice } = this.props;

    if (trial < 5 || treeChoice !== "") {
      let eggFallPercentage;
      if (treeChoice !== "") {
        eggFallPercentage = 110;
      } else if (condition === 1) {
        eggFallPercentage = 80;
      } else if (condition === 2) {
        eggFallPercentage = trial * 20;
      }

      return (
        <Trial eggFallPercentage={eggFallPercentage} treeChoice={treeChoice} />
      );
    } else {
      // subject finished experiment, need to go over results and ask for desired
      // tree
      return <Summary />;
    }
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    condition: state.register.condition,
    trial: state.experiment.trial,
    treeChoice: state.experiment.treeChoice
  };
}

export default connect(
  mapStateToProps,
  null
)(Experiment);
