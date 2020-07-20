import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";
import hand from "../../images/hand.png";
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

  componentDidMount() {}

  // // show egg falling off platform
  // setTimeout(() => {
  //   this.setState({
  //     eggAnimation: "fall 2.0s ease-in 1 backwards"
  //   });
  // }, 9000);
  //
  // // make the egg and platform go up
  // setTimeout(() => {
  //   document.getElementById("hand").style.display = "block";
  //   this.setState({
  //     eggAnimation: "shake 0.5s infinite",
  //     eggAndPlatformAnimation: "rise 1s forwards"
  //   });
  //   setTimeout(() => {
  //     this.props.completedTrial();
  //   }, 1500);
  // }, 12000);

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

    const handHeight = "100px";
    // subtract pixels from left edge of hand to index finger
    const handLeft = "calc(50% - 20px)";
    const handTop = EGG_HEIGHT / 2;

    return (
      <div>
        <div id="divLeftTree" className="tree-highlight left-tree" />
        <div id="divRightTree" className="tree-highlight right-tree" />
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
              position: "relative",
              height: EGG_HEIGHT,
              animation: this.state.eggAnimation
            }}
            className="img-egg"
            id="egg"
            src={egg}
            alt=""
          />
          <img
            style={{
              top: 0,
              width: EGG_PLATFORM_WIDTH,
              height: EGG_PLATFORM_HEIGHT
            }}
            className="img-introduction-egg-platform"
            src={egg_platform}
            alt=""
          />
          <img
            style={{
              height: handHeight,
              left: handLeft,
              top: handTop,
              display: "none"
            }}
            className="img-hand"
            src={hand}
            id="hand"
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
    completedTrial: () => {
      experimentDispatchers.completedTrial();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Instruction);
