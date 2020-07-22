import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Guess from "./Guess";
import Markers from "./Markers";
import Congratulations from "./Congratulations";
import "./trial.css";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";
import startTrialAudio from "../../audio/bell.mp3";

import {
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  SLIDER_TOP_PERCENT,
  EGG_PLATFORM_WIDTH,
  EGG_PLATFORM_HEIGHT,
  EGG_HEIGHT,
  EGG_WIDTH,
  SLIDER_THUMB_HEIGHT
} from "./constants";

class Trial extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0,
      eggAnimation: "none",
      eggFalling: false,
      eggFell: false,
      hasGuessed: false,
      showCongratulations: false
    };
  }

  componentDidMount() {
    const { treeChoice } = this.props;
    if (treeChoice !== "") {
      // ensure success, no need for subject to guess
      this.setState({ hasGuessed: true });
    }
  }

  onChange = e => {
    // console.log("e.target.value = ", e.target.value);
    if (this.state.eggAnimation === "none") {
      this.setState({ eggAnimation: "shake 0.5s infinite" });
    }
    this.setState({ eggHeight: e.target.value });
  };

  onChangeEnd = () => {
    // when the egg begins to fall, already changed to falling animation
    if (this.state.eggAnimation === "shake 0.5s infinite") {
      this.setState({ eggAnimation: "none" });
    }
  };

  componentDidUpdate() {
    const { guesses, trial, eggFallPercentage, treeChoice } = this.props;
    if (!this.state.hasGuessed && trial === guesses.length) {
      this.setState({ hasGuessed: true });
      document.getElementById("startTrialAudio").play();
      console.log("startTrialAudio");
    }

    if (this.state.eggHeight > eggFallPercentage && !this.state.eggFalling) {
      // egg needs to fall
      this.setState({
        eggFalling: true,
        eggAnimation: "fall 2.0s ease-in 1 forwards"
      });

      // this increases the trial count and adds the marker
      this.props.completedTrial();

      if (trial < 4) {
        document.getElementById("markTrialAudio").play();
        console.log("markTrialAudio");

        setTimeout(() => {
          // need to remove the egg or else it will make the page longer
          document.getElementById("egg").style.display = "none";
        }, 2000);

        // reset trial to begin again
        setTimeout(() => {
          // reset the egg
          document.getElementById("egg").style.display = "block";
          document.getElementById("egg").style.animation = "none";

          // reset state
          this.setState({
            eggHeight: 0,
            eggAnimation: "none",
            eggFalling: false,
            eggFell: false,
            hasGuessed: false,
            showCongratulations: false
          });
        }, 3000);
      } else {
        // just completed 4th trial, need to move to next phase
        document.getElementById("markFinalTrialAudio").play();
        console.log("markFinalTrialAudio");

        // let the markFinalTrialAudio finish
        setTimeout(() => {
          this.props.advancePhase("summary");
        }, 5000);
      }
    }

    if (
      !this.state.showCongratulations &&
      ((treeChoice === "left" && this.state.eggHeight > 50) ||
        (treeChoice === "right" && this.state.eggHeight > 95))
    ) {
      // child successfully brought egg up tree
      this.setState({
        showCongratulations: true
      });
    }
  }

  renderGuess() {
    // don't need the Guess component for last trial when subject is
    // guaranteed success
    if (this.props.treeChoice === "") {
      return <Guess hasGuessed={this.state.hasGuessed} />;
    }
  }

  render() {
    const ladderHeightPercent =
      SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;

    document.documentElement.style.setProperty(
      "--slider-top-percent",
      String(SLIDER_TOP_PERCENT) + "%"
    );
    document.documentElement.style.setProperty(
      "--ladder-height",
      String(ladderHeightPercent) + "vh"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-width",
      String(EGG_PLATFORM_WIDTH) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-height",
      String(EGG_PLATFORM_HEIGHT) + "px"
    );
    document.documentElement.style.setProperty(
      "--slider-thumb-height",
      String(SLIDER_THUMB_HEIGHT) + "px"
    );

    const sliderLeft = "calc(50% - " + String(EGG_PLATFORM_WIDTH / 2) + "px)";
    const platformTop =
      "calc(" +
      String(100 - this.state.eggHeight) +
      "% - " +
      String(EGG_PLATFORM_HEIGHT) +
      "px)";

    const eggTop =
      "calc(" +
      String(100 - this.state.eggHeight) +
      "% - " +
      String(EGG_PLATFORM_HEIGHT + EGG_HEIGHT) +
      "px)";
    const eggLeft = "calc(50% - " + String(EGG_WIDTH / 2) + "px)";

    const isEggSliderDisabled =
      !this.state.hasGuessed ||
      this.state.eggFalling ||
      this.state.eggFell ||
      this.state.showCongratulations;

    return (
      <div>
        <audio id="startTrialAudio">
          <source src={startTrialAudio} type="audio/mpeg" />
        </audio>
        {this.renderGuess()}
        <div style={{ left: sliderLeft }} className="slider-container">
          <input
            onChange={this.onChange}
            type="range"
            min="0"
            max="100"
            value={this.state.eggHeight}
            className="slider"
            id="eggHeight"
            onMouseUp={this.onChangeEnd}
            onTouchEnd={this.onChangeEnd}
            disabled={isEggSliderDisabled}
          />
          <img
            style={{ top: platformTop }}
            className="img-egg-platform"
            src={egg_platform}
            alt=""
          />
          <img
            style={{
              height: EGG_HEIGHT,
              top: eggTop,
              left: eggLeft,
              animation: this.state.eggAnimation
            }}
            className="img-egg"
            id="egg"
            src={egg}
            alt=""
          />
          <Markers />
        </div>
        <Congratulations showCongratulations={this.state.showCongratulations} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    trial: state.experiment.trial,
    guesses: state.experiment.guesses
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    completedTrial: () => {
      experimentDispatchers.completedTrial();
    },
    advancePhase: nextPhase => {
      experimentDispatchers.advancePhase(nextPhase);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trial);
