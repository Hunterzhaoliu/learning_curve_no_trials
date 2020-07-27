import React, { Component } from "react";
import { connect } from "react-redux";
import Introduction from "./Introduction";
import Practice from "./Practice";
import Instruction from "./Instruction";
import Trial from "./Trial";
import Summary from "./Summary";
import background from "../../images/background.png";
import "./experiment.css";

class Experiment extends Component {
  renderExperiment() {
    const { phase } = this.props;
    switch (phase) {
      case "introduction":
        return <Introduction />;
        break;
      case "practice":
        return <Practice />;
        break;
      case "instruction":
        return <Instruction />;
        break;
      case "trial":
        const { condition, trial, treeChoice } = this.props;
        let eggFallPercentage;
        if (condition === 1) {
          eggFallPercentage = 80;
        } else if (condition === 2) {
          eggFallPercentage = trial * 20;
        }
        return (
          <Trial
            eggFallPercentage={eggFallPercentage}
            treeChoice={treeChoice}
          />
        );
        break;
      case "summary":
        // subject finished experiment, need to go over results, ask for desired
        // tree, and ask tree choice reasoning
        return <Summary />;
        break;
      case "conclusion":
        return (
          <Trial
            eggFallPercentage={eggFallPercentage}
            treeChoice={treeChoice}
          />
        );
        break;
      default:
        return <Introduction />;
    }
  }

  render() {
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
