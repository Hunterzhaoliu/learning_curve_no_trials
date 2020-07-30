import React, { Component } from "react";
import { connect } from "react-redux";
import Introduction from "./Introduction";
import Practice from "./Practice";
import Instruction from "./Instruction";
import Trial from "./Trial";
import Summary from "./Summary";
import background from "../../images/background.png";
import "./experiment.css";

// import summaryAudio from "../../audio/line13_14.mp3";

class Experiment extends Component {
  renderExperiment() {
    const { phase } = this.props;
    switch (phase) {
      case "introduction":
        return <Introduction />;
      case "practice":
        return <Practice />;
      case "instruction":
        return <Instruction />;
      case "trial":
        const { condition, trial } = this.props;
        let eggFallPercentage;
        if (condition === 1) {
          eggFallPercentage = 80;
        } else if (condition === 2) {
          eggFallPercentage = trial * 20;
        }
        return <Trial eggFallPercentage={eggFallPercentage} treeChoice={""} />;
      case "summary":
        // subject finished experiment, need to go over results, ask for desired
        // tree, and ask tree choice reasoning
        return <Summary />;
      case "conclusion":
        return (
          <Trial eggFallPercentage={110} treeChoice={this.props.treeChoice} />
        );
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
