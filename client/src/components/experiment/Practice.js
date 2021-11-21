import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import line4 from "../../audio/line4.wav";
import warningAudio from "../../audio/line5_long_end.wav";

import Trial from "./Trial";
import "./practice.css";

import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";

import {
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH,
  EGG_PLATFORM_HEIGHT,
  EGG_HEIGHT
} from "./constants";

class Practice extends Component {
  constructor() {
    super();
    this.state = {
      eggAnimation: "none"
    };
  }

  componentDidMount() {
    document.getElementById("line4").play();
    console.log("line4");

    // don't want to display egg from Trial while in practice
    document.getElementById("egg").style.display = "none";
  }

  onClick = () => {
    document.getElementById("buttonPractice").style.display = "none";
    document.getElementById("fallingEggAndPlatform").style.display = "inline-block";

    document.getElementById("warningAudio").play();
    console.log("warningAudio");
  };

  onTimeUpdate(currentTime) {
    if (currentTime > 8) {
      // show egg falling off platform
      this.setState({
        eggAnimation: "fall 2.0s ease-in 1 backwards"
      });
    }
  }

  onAudioEnded(id) {
    if (id === "line4") {
      setTimeout(function() {
        // add a little time after the audio before displaying button
        document.getElementById("buttonPractice").style.display = "inline-block";
      }, 2000);
    } else if (id === "warningAudio") {
      this.props.advancePhase("expectation");
    }
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

    // using tree choice to determine whether to show Guess component
    return (
      <div className="div-absolute">
        <button
          onClick={this.onClick}
          id="buttonPractice"
          className="button-main button-practice"
        >
          Done with Practice <br />
          Hands Back on Lap
        </button>
        <audio onEnded={e => this.onAudioEnded(e.target.id)} id="line4">
          <source src={line4} type="audio/wav" />
        </audio>
        <Trial eggFallPercentage={110} treeChoice="practice" />
        <audio
          onEnded={this.onAudioEnded}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="warningAudio"
        >
          <source src={warningAudio} type="audio/wav" />
        </audio>
        <div
          className="div-egg-and-platform"
          id="fallingEggAndPlatform"
          style={{
            top: eggAndPlatformTop,
            left: eggAndPlatformLeft,
            width: EGG_PLATFORM_WIDTH,
          }}
        >
          <img
            style={{
              height: EGG_HEIGHT,
              animation: this.state.eggAnimation
            }}
            className="img-egg img-relative"
            id="fallingEgg"
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
)(Practice);
