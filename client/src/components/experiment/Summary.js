import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import hand from "../../images/hand.png";
import summaryAudio from "../../audio/bell.mp3";
import questionAudio from "../../audio/bell.mp3";
import goTopAudio from "../../audio/bell.mp3";
import "./summary.css";
import "./instruction.css";

import {
  SLIDER_TOP_PERCENT,
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH
} from "./constants";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      treeChoice: ""
    };
  }

  componentDidMount() {
    const markerHighlightDelay = [1000, 2000, 3000, 4000];
    // highlight the first marker so the for loop can remove the previous
    // marker's highlight in the same iteration
    setTimeout(function() {
      document.getElementById("marker0").style.border = "3px solid yellow";
    }, markerHighlightDelay[0]);
    for (let i = 1; i < 4; i++) {
      // need to highlight each marker as the audio walks through them and
      // unhighlight the previous marker
      setTimeout(function() {
        document.getElementById("marker" + String(i - 1)).style.border = "none";
        document.getElementById("marker" + String(i)).style.border =
          "3px solid yellow";
      }, markerHighlightDelay[i]);
    }

    // display the right pointing hand
    setTimeout(function() {
      // unhighlight the last marker
      document.getElementById("marker3").style.border = "none";

      document.getElementById("handRight").style.display = "block";
    }, 6000);

    // display the left pointing hand
    setTimeout(function() {
      // remove the right pointing hand
      document.getElementById("handRight").style.display = "none";

      document.getElementById("handLeft").style.display = "block";

      // remove the left pointing hand
      setTimeout(function() {
        document.getElementById("handLeft").style.display = "none";
      }, 1000);

      // display both tree buttons
      document.getElementById("buttonLeftTree").style.display = "block";
      document.getElementById("buttonRightTree").style.display = "block";
    }, 8000);
  }

  onClickTree = e => {
    this.setState({ treeChoice: e.target.value });

    // ask comprehension questions
    document.getElementById("questionAudio").play();
    console.log("questionAudio");

    // display both reflection buttons
    setTimeout(function() {
      document.getElementById("buttonBetter").style.display = "block";
      document.getElementById("buttonSame").style.display = "block";
    }, 1000);
  };

  onClickReflection = e => {
    // ensure success
    document.getElementById("goTopAudio").play();
    console.log("goTopAudio");

    const data = {
      dBID: this.props.dBID,
      guesses: this.props.guesses,
      treeChoice: this.state.treeChoice,
      reflection: e.target.value
    };

    setTimeout(() => {
      this.props.saveData(data);
    }, 2000);
  };

  render() {
    const ladderHeightPercent =
      SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;

    // marker left is 110% of eggPlatformWidth in Markers.js
    // after reaching half screen, add an additional 60% of eggPlatformWidth
    const sliderLeft = "calc(50% + " + String(EGG_PLATFORM_WIDTH * 0.6) + "px)";

    // need to decide which reflection button display on left vs. right
    const randomNumber = Math.random(); // between 0 (inclusive) and 1 (exclusive)
    let betterLeft = 0;
    let sameLeft = "50%";
    if (randomNumber > 0.5) {
      betterLeft = "50%";
      sameLeft = 0;
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
        <audio id="summaryAudio">
          <source src={summaryAudio} type="audio/mpeg" />
        </audio>
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
          value="right"
          onClick={this.onClickTree}
          className="button-tree right-tree"
          id="buttonRightTree"
        />
        <button
          value="left"
          onClick={this.onClickTree}
          className="button-tree left-tree"
          id="buttonLeftTree"
        />
        <button
          value="better"
          style={{ left: betterLeft }}
          onClick={this.onClickReflection}
          className="button-main button-reflection"
          id="buttonBetter"
        >
          Better
        </button>
        <button
          value="same"
          style={{ left: sameLeft }}
          onClick={this.onClickReflection}
          className="button-main button-reflection"
          id="buttonSame"
        >
          Same
        </button>
        <audio id="questionAudio">
          <source src={questionAudio} type="audio/mpeg" />
        </audio>
        <audio id="goTopAudio">
          <source src={goTopAudio} type="audio/mpeg" />
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
