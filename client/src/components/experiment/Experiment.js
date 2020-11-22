import React, { Component } from "react";
import { connect } from "react-redux";
import Preparation from "./Preparation";
import Introduction from "./Introduction";
import Practice from "./Practice";
import Instruction from "./Instruction";
import Trial from "./Trial";
import Summary from "./Summary";
import Conclusion from "./Conclusion";

import "./experiment.css";

import background from "../../images/background.png";

import summaryAudio from "../../audio/line13_14.mp3";

import { EGG_FALL_INCREASING, EGG_FALL_CONSTANT } from "./constants";

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
      case "instruction":
        return <Instruction />;
      case "trial":
        const { condition, trial } = this.props;
        let eggFallPercentage;
        if (condition === "constant") {
          eggFallPercentage = EGG_FALL_CONSTANT[trial - 1];
        } else if (condition === "increasing") {
          eggFallPercentage = EGG_FALL_INCREASING[trial - 1];
        }
        return <Trial eggFallPercentage={eggFallPercentage} treeChoice={""} />;
      case "summary":
        // subject finished experiment, need to go over results, ask for desired
        // tree, and ask tree choice reasoning
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

  onAudioEnded() {
    // Only for summmaryAudio; display both tree buttons
    document.getElementById("buttonLeftTree").style.display = "block";
    document.getElementById("buttonRightTree").style.display = "block";
  }

  onTimeUpdate(currentTime) {
    if (currentTime > 25) {
      // remove the left pointing hand
      document.getElementById("handLeft").style.display = "none";
    } else if (currentTime > 23) {
      // remove the right pointing hand
      document.getElementById("handRight").style.display = "none";
      // display the left pointing hand
      document.getElementById("handLeft").style.display = "block";
    } else if (currentTime > 21) {
      // unhighlight the last marker
      document.getElementById("marker3").style.border = "none";
      // display the right pointing hand
      document.getElementById("handRight").style.display = "block";
    } else if (currentTime > 15) {
      document.getElementById("marker2").style.border = "none";
      document.getElementById("marker3").style.zIndex = 5;
      document.getElementById("marker3").style.border = "3px solid yellow";
    } else if (currentTime > 12) {
      document.getElementById("marker1").style.border = "none";
      document.getElementById("marker2").style.zIndex = 4;
      document.getElementById("marker2").style.border = "3px solid yellow";
    } else if (currentTime > 8) {
      // need to highlight each marker as the audio walks through them and
      // unhighlight the previous marker
      document.getElementById("marker0").style.border = "none";
      document.getElementById("marker1").style.zIndex = 3;
      document.getElementById("marker1").style.border = "3px solid yellow";
    } else if (currentTime > 5) {
      document.getElementById("marker0").style.zIndex = 2;
      document.getElementById("marker0").style.border = "3px solid yellow";
    }
  }

  render() {
    return (
      <div>
        <img className="img-background" src={background} alt="" />
        <audio
          onEnded={this.onAudioEnded}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="summaryAudio"
        >
          <source src={summaryAudio} type="audio/mpeg" />
        </audio>
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
