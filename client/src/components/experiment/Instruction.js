import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./instruction.css";
import "./trial.css";

import hand from "../../images/hand.png";

import instructionAudio from "../../audio/line6_7.wav";

class Instruction extends Component {
  componentDidMount() {
    document.getElementById("instructionAudio").play();
  }

  onAudioEnded = () => {
    // only for instructionAudio
    this.props.advancePhase("trial");
  };

  onTimeUpdate(currentTime) {
    // only for instructionAudio
    if (currentTime > 9) {
      document.getElementById("hand").style.display = "block";
    } else if (currentTime > 3.5) {
      document.getElementById("hand").style.display = "none";
    } else if (currentTime > 2) {
      // point to the right tree
      document.getElementById("hand").style.display = "block";
    }
  }

  render() {
    const {condition } = this.props;

    let handClassName = "img-hand img-hand-left";

    const showTallTreeOnRight = condition === "tallRightExpectHigh" || +
      condition === "tallRightExpectLow" || condition === "tallRightBaseline"
        
    if (showTallTreeOnRight) {
      handClassName = "img-hand img-hand-right"
    }

    return (
      <div className="div-absolute">
        <img className={handClassName} src={hand} id="hand" alt="" />
        <audio
          onEnded={this.onAudioEnded}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="instructionAudio"
        >
          <source src={instructionAudio} type="audio/wav" />
        </audio>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    condition: state.register.condition,
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    advancePhase: nextPhase => {
      experimentDispatchers.advancePhase(nextPhase);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instruction);
