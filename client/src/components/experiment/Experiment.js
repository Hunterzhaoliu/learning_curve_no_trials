import React, { Component } from "react";
import { connect } from "react-redux";
import Preparation from "./Preparation";
import Expectation from "./Expectation";
import Introduction from "./Introduction";
import Practice from "./Practice";
import Instruction from "./Instruction";
import Trial from "./Trial";
import Summary from "./Summary";
import Conclusion from "./Conclusion";

import "./experiment.css";

import backgroundTallLeft from "../../images/background_tall_left.png";
import backgroundTallRight from "../../images/background_tall_right.png";

import { EGG_FALL_INCREASING } from "./constants";

class Experiment extends Component {
  renderExperiment() {
    const { phase } = this.props;

    switch (phase) {
      case "preparation":
        return <Preparation />;
      case "introduction":
        return <Introduction recorder={this.props.recorder} />;
      case "practice":
        return <Practice />;
      case "expectation":
        return <Expectation recorder={this.props.recorder}/>;
      case "instruction":
        return <Instruction />;
      case "trial":
        const { trial } = this.props;
        const eggFallPercentage = EGG_FALL_INCREASING[trial - 1];
        return <Trial eggFallPercentage={eggFallPercentage} treeChoice={""} />;
      case "summary":
        // ask for desired tree, and ask tree choice reasoning
        return <Summary recorder={this.props.recorder} />;
      case "success":
        return (
          <Trial
            recorder={this.props.recorder}
            eggFallPercentage={110}
            treeChoice={this.props.treeChoice}
          />
        );
      case "conclusion":
        return <Conclusion />;
      default:
        return <Introduction />;
    }
  }

  render() {
    const {condition} = this.props;

    let background = backgroundTallLeft;

    const showTallTreeOnRight = condition === "tallRightExpectHigh" || +
      condition === "tallRightExpectLow" || condition === "tallRightBaseline"
        
    if (showTallTreeOnRight) {
      background = backgroundTallRight
    }

    return (
      <div>
        <img className="img-background" src={background} alt="" />
        {this.renderExperiment()}
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
    phase: state.experiment.phase,
    trial: state.experiment.trial,
    treeChoice: state.experiment.treeChoice
  };
}

export default connect(
  mapStateToProps,
  null
)(Experiment);
