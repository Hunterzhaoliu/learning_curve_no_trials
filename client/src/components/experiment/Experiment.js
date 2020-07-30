import React, { Component } from "react";
import { connect } from "react-redux";
import Introduction from "./Introduction";
import Practice from "./Practice";
import Instruction from "./Instruction";
import Trial from "./Trial";
import Summary from "./Summary";
import background from "../../images/background.png";
import "./experiment.css";

import summaryAudio from "../../audio/line13_14.mp3";

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

  // onSummaryAudioTimeUpdate() {
  //   console.log("onSummaryAudioTimeUpdate");
  //   const markerHighlightDelay = [5000, 9000, 12500, 16000];
  //   // highlight the first marker so the for loop can remove the previous
  //   // marker's highlight in the same iteration
  //   setTimeout(function() {
  //     document.getElementById("marker0").style.border = "3px solid yellow";
  //   }, markerHighlightDelay[0]);
  //   for (let i = 1; i < 4; i++) {
  //     // need to highlight each marker as the audio walks through them and
  //     // unhighlight the previous marker
  //     setTimeout(function() {
  //       document.getElementById("marker" + String(i - 1)).style.border = "none";
  //       document.getElementById("marker" + String(i)).style.border =
  //         "3px solid yellow";
  //     }, markerHighlightDelay[i]);
  //   }
  //
  //   // display the right pointing hand
  //   setTimeout(function() {
  //     // unhighlight the last marker
  //     document.getElementById("marker3").style.border = "none";
  //
  //     document.getElementById("handRight").style.display = "block";
  //   }, 21000);
  //
  //   // display the left pointing hand
  //   setTimeout(function() {
  //     // remove the right pointing hand
  //     document.getElementById("handRight").style.display = "none";
  //
  //     document.getElementById("handLeft").style.display = "block";
  //
  //     // remove the left pointing hand
  //     setTimeout(function() {
  //       document.getElementById("handLeft").style.display = "none";
  //     }, 2000);
  //   }, 23000);
  //
  //   setTimeout(function() {
  //     // display both tree buttons
  //     document.getElementById("buttonLeftTree").style.display = "block";
  //     document.getElementById("buttonRightTree").style.display = "block";
  //   }, 26000);
  //
  //   // if (currentTime > 23) {
  //   //   document.getElementById("buttonIntroduction10").style.display =
  //   //     "inline-block";
  //   // } else if (currentTime > 20) {
  //   //   document.getElementById("handsOnLap").style.display = "inline-block";
  //   // } else if (currentTime > 12) {
  //   //   document.getElementById("child").style.display = "inline-block";
  //   // } else if (currentTime > 6) {
  //   //   document.getElementById("buttonPress").style.display = "inline-block";
  //   // }
  // }

  render() {
    // onTimeUpdate={e =>
    //   this.onSummaryAudioTimeUpdate(e.target.currentTime)
    // }
    return (
      <div>
        <img className="img-background" src={background} alt="" />
        <audio id="summaryAudio">
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
