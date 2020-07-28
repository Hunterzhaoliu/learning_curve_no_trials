import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";
import hand from "../../images/hand.png";
import instructionAudio from "../../audio/line5_6_7.mp3";
import "./instruction.css";
import "./trial.css";

import {
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH,
  EGG_PLATFORM_HEIGHT,
  EGG_HEIGHT
} from "./constants";

class Instruction extends Component {
  constructor() {
    super();
    this.state = {
      eggAnimation: "none",
      eggAndPlatformAnimation: "none"
    };
  }

  componentDidMount() {
    document.getElementById("instructionAudio").play();

    // show egg falling off platform
    setTimeout(() => {
      this.setState({
        eggAnimation: "fall 2.0s ease-in 1 backwards"
      });
    }, 8000);

    // point to the right tree
    setTimeout(() => {
      document.getElementById("hand").style.display = "block";

      setTimeout(() => {
        document.getElementById("hand").style.display = "none";
      }, 1500);
    }, 12000);

    setTimeout(() => {
      this.props.advancePhase("trial");
    }, 22100);
  }

  render() {
    const eggAndPlatformTop =
      "calc(" +
      String(SCREEN_TO_LADDER_BOTTOM_PERCENT) +
      "% - " +
      String(EGG_PLATFORM_HEIGHT + EGG_HEIGHT) +
      "px)";
    const eggAndPlatformLeft =
      "calc(50% - " + String(EGG_PLATFORM_WIDTH / 2) + "px)";

    document.documentElement.style.setProperty(
      "--egg-and-platform-start-height",
      String(SCREEN_TO_LADDER_BOTTOM_PERCENT - 100) + "vh"
    );

    return (
      <div className="div-absolute">
        <img className="img-hand img-hand-right" src={hand} id="hand" alt="" />
        <audio id="instructionAudio">
          <source src={instructionAudio} type="audio/mpeg" />
        </audio>
        <div
          className="div-egg-and-platform"
          style={{
            top: eggAndPlatformTop,
            left: eggAndPlatformLeft,
            width: EGG_PLATFORM_WIDTH,
            animation: this.state.eggAndPlatformAnimation
          }}
        >
          <img
            style={{
              height: EGG_HEIGHT,
              animation: this.state.eggAnimation
            }}
            className="img-egg img-relative"
            id="egg"
            src={egg}
            alt=""
          />
          <img
            style={{
              width: EGG_PLATFORM_WIDTH,
              height: EGG_PLATFORM_HEIGHT
            }}
            src={egg_platform}
            alt=""
          />
        </div>
      </div>
    );
  }
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
  null,
  mapDispatchToProps
)(Instruction);
