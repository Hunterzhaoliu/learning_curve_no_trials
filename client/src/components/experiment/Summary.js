import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import "./summary.css";

import hand from "../../images/hand.png";
import same from "../../images/same.png";
import better from "../../images/better.png";

import questionSameAudio from "../../audio/line16_same_cut.wav";
import questionBetterAudio from "../../audio/line16_better_cut.wav";
import goTopAudio from "../../audio/line15.wav";

import {
  SLIDER_TOP_PERCENT,
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH
} from "./constants";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      topButton: Math.random(), // < .5 means same goes on top
      treeChoice: "",
      reflection: ""
    };
  }

  onClickTree = e => {
    this.setState({ treeChoice: e.target.value });

    // ask comprehension questions
    if (this.state.topButton < 0.5) {
      document.getElementById("questionSameAudio").play();
      console.log("questionSameAudio");
    } else {
      document.getElementById("questionBetterAudio").play();
      console.log("questionBetterAudio");
    }
  };

  onClickReflection = e => {
    this.setState({ reflection: e.target.value });

    // remove buttons
    document.getElementById("buttonBetter").style.display = "none";
    document.getElementById("buttonSame").style.display = "none";

    // ensure success
    document.getElementById("goTopAudio").play();
    console.log("goTopAudio");
  };

  onAudioEnded(audioId) {
    if (audioId === "questionSameAudio" || audioId === "questionBetterAudio") {
      // display both reflection buttons
      document.getElementById("buttonBetter").style.display = "block";
      document.getElementById("buttonSame").style.display = "block";
    } else if (audioId === "goTopAudio") {
      const data = {
        dBID: this.props.dBID,
        guesses: this.props.guesses,
        treeChoice: this.state.treeChoice,
        reflection: this.state.reflection
      };

      this.props.saveData(data);
    }
  }

  onTimeUpdate(currentTime) {
    if (currentTime > 2.5) {
      if (this.state.treeChoice === "left") {
        document.getElementById("handLeft").style.display = "block";
      } else {
        document.getElementById("handRight").style.display = "block";
      }
    }
  }

  render() {
    const ladderHeightPercent =
      SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;

    // marker left is 110% of eggPlatformWidth in Markers.js
    // after reaching half screen, add an additional 60% of eggPlatformWidth
    const sliderLeft = "calc(50% + " + String(EGG_PLATFORM_WIDTH * 0.6) + "px)";

    // need to decide which reflection button display on left vs. right
    let sameTop;
    let betterTop;
    if (this.state.topButton < 0.5) {
      betterTop = "50%";
      sameTop = 0;
    } else {
      betterTop = 0;
      sameTop = "50%";
    }

    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: sliderLeft,
            top: String(SLIDER_TOP_PERCENT) + "%",
            height: String(ladderHeightPercent) + "%"
          }}
        >
          <Markers />
        </div>
        <img
          className="img-hand img-hand-left"
          src={hand}
          id="handLeft"
          alt=""
        />
        <img
          className="img-hand img-hand-right"
          src={hand}
          id="handRight"
          alt=""
        />
        <button
          value="left"
          onClick={this.onClickTree}
          className="button-tree"
          id="buttonLeftTree"
        />
        <button
          value="right"
          onClick={this.onClickTree}
          className="button-tree right-tree"
          id="buttonRightTree"
        />
        <button
          value="same"
          style={{ top: sameTop }}
          onClick={this.onClickReflection}
          className="button-main button-reflection"
          id="buttonSame"
        >
          <img className="img-plants" src={same} alt="" />
          <h3 className="h3-reflection">Same</h3>
        </button>
        <button
          value="better"
          style={{ top: betterTop }}
          onClick={this.onClickReflection}
          className="button-main button-reflection"
          id="buttonBetter"
        >
          <img className="img-plants" src={better} alt="" />
          <h3 className="h3-reflection">Better</h3>
        </button>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="questionSameAudio"
        >
          <source src={questionSameAudio} type="audio/wav" />
        </audio>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="questionBetterAudio"
        >
          <source src={questionBetterAudio} type="audio/wav" />
        </audio>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="goTopAudio"
        >
          <source src={goTopAudio} type="audio/wav" />
        </audio>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
    guesses: state.experiment.guesses
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    saveData: data => {
      experimentDispatchers.saveData(data);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
