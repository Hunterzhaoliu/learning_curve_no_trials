import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Password from "./Password";
const { Content } = Layout;

class Landing extends Component {
  renderDisplay() {
    const { step } = this.props;
    switch (step) {
      case 0:
        return <Password />;
        break;
      default:
        return <Password />;
    }
    // Step 0: Password
    // Step 1: Consent
    // Step 2: Information
    // Step 3: Practice Instructions
    // Step 4: Practice Trial
    // Step 5: Experiment Instructions
    // Step 6: Prediction
    // Step 7: Experiment
    // Step 8: Tall or Short Tree
    // Step 9: Win
    // step 10: Ask Questions
  }

  render() {
    return <Content className="content">{this.renderDisplay()}</Content>;
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    step: state.initialize.step
  };
}

export default connect(
  mapStateToProps,
  null
)(Landing);
