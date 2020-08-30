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
import background_egg_left from "../../images/background_egg_left.png";
import background_egg_right from "../../images/background_egg_right.png";

import startTrialAudio from "../../audio/line9.wav";
import startTopTrialAudio from "../../audio/line10.wav";
import congratulationsAudio from "../../audio/congratulations.wav";

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
      trialStartTime: "",
      eggHeight: 0,
      eggAnimation: "none",
      hasGuessed: false,
      trialReady: false,
      eggFalling: false,
      showCongratulations: false
    };
  }

  componentDidMount() {
    const { treeChoice } = this.props;
    if (treeChoice !== "") {
      // ensure success, no need for subject to guess
      this.setState({ hasGuessed: true, trialReady: true });
    }

    // stop the context menu from opening when tap and holding on image
    window.oncontextmenu = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
  }

  componentDidUpdate() {
    const { guesses, trial } = this.props;
    if (!this.state.hasGuessed && trial === guesses.length) {
      this.setState({ hasGuessed: true });
      if (guesses[trial - 1] < 95) {
        document.getElementById("startTrialAudio").play();
        console.log("startTrialAudio");
      } else {
        document.getElementById("startTopTrialAudio").play();
        console.log("startTopTrialAudio");
      }
    }
  }

  onInput(newEggHeight) {
    // console.log("newEggHeight = ", newEggHeight);
    if (this.state.trialStartTime === "") {
      this.setState({ trialStartTime: new Date() });
    }

    if (this.state.eggAnimation === "none") {
      this.setState({ eggAnimation: "shake 0.5s infinite" });
    }

    this.setState({ eggHeight: newEggHeight });

    if (!this.state.eggFalling && newEggHeight > this.props.eggFallPercentage) {
      // done with trial, note the trial length to be saved in state
      const trialLength = new Date() - this.state.trialStartTime;

      const { trial } = this.props;
      // egg needs to fall
      // if input is moved too quickly, the platform can be significantly above
      // the expected fall percentage, so ensure it's just above right place
      this.setState({
        eggHeight: this.props.eggFallPercentage + 1,
        eggFalling: true,
        eggAnimation: "fall 2.0s ease-in 1 forwards"
      });

      if (trial < 4) {
        document.getElementById("markTrialAudio").play();
        console.log("markTrialAudio");

        setTimeout(() => {
          // need to remove the egg or else it will make the page longer
          document.getElementById("egg").style.display = "none";
        }, 2000);
      } else {
        document.getElementById("markFinalTrialAudio").play();
        console.log("markFinalTrialAudio");
      }

      setTimeout(() => {
        // this increases the trial count and adds the marker
        this.props.completedTrial(trialLength);
      }, 7000);
    }

    const { treeChoice } = this.props;
    if (
      !this.state.showCongratulations &&
      ((treeChoice === "left" && this.state.eggHeight > 75) ||
        (treeChoice === "right" && this.state.eggHeight > 95))
    ) {
      document.getElementById("congratulationsAudio").play();
      console.log("congratulationsAudio");

      // child successfully brought egg up tree; need to show egg in nest
      document.getElementById("egg").style.display = "none";
      if (treeChoice === "left") {
        document.getElementById("backgroundEggLeft").style.display = "block";
      } else {
        document.getElementById("backgroundEggRight").style.display = "block";
      }

      this.setState({
        showCongratulations: true
      });
    }
  }

  onInputEnd = () => {
    // when the egg begins to fall, already changed to falling animation
    if (this.state.eggAnimation === "shake 0.5s infinite") {
      this.setState({ eggAnimation: "none" });
    }
  };

  onAudioEnded = elementId => {
    if (elementId === "startTrialAudio" || elementId === "startTopTrialAudio") {
      // allow subject to manipulate egg
      this.setState({ trialReady: true });

      // removed egg for guessing, bring it back
      document.getElementById("egg").style.display = "block";
    } else if (elementId === "markTrialAudio") {
      // reset trial to begin again; keep the egg gone for the guess
      document.getElementById("egg").style.animation = "none";

      // reset state
      this.setState({
        trialStartTime: "",
        eggHeight: 0,
        eggAnimation: "none",
        hasGuessed: false,
        trialReady: false,
        eggFalling: false,
        showCongratulations: false
      });
    } else if (elementId === "markFinalTrialAudio") {
      // the button is in Trial.js and the audio element is in Experiment
      document.getElementById("summaryAudioButton").click();
      this.props.advancePhase("summary");
    }
  };

  playAudio() {
    // only being used to simulate summaryAudioButton click for now
    document.getElementById("summaryAudio").play();
    console.log("summaryAudio");
  }

  renderGuess() {
    // don't need the Guess component for last trial when subject is
    // guaranteed success
    if (this.props.treeChoice === "") {
      return <Guess hasGuessed={this.state.hasGuessed} />;
    }
  }

  renderCongratulations() {
    if (this.state.showCongratulations) {
      return <Congratulations />;
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
      !this.state.trialReady ||
      this.state.eggFalling ||
      this.state.showCongratulations;

    return (
      <div className="div-absolute">
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="startTrialAudio"
        >
          <source src={startTrialAudio} type="audio/wav" />
        </audio>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="startTopTrialAudio"
        >
          <source src={startTopTrialAudio} type="audio/wav" />
        </audio>
        <div style={{ left: sliderLeft }} className="slider-container">
          <input
            onInput={e => this.onInput(e.target.value)}
            type="range"
            min="0"
            max="100"
            value={this.state.eggHeight}
            className="slider"
            id="eggHeight"
            onMouseUp={this.onInputEnd}
            onTouchEnd={this.onInputEnd}
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
          <Markers onAudioEnded={this.onAudioEnded} />
          <button
            onClick={this.playAudio}
            id="summaryAudioButton"
            className="button-audio"
          />
        </div>
        {this.renderGuess()}
        {this.renderCongratulations()}
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="congratulationsAudio"
        >
          <source src={congratulationsAudio} type="audio/wav" />
        </audio>
        <img
          className="img-background img-none"
          src={background_egg_left}
          alt=""
          id="backgroundEggLeft"
        />
        <img
          className="img-background img-none"
          src={background_egg_right}
          alt=""
          id="backgroundEggRight"
        />
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
    completedTrial: trialLength => {
      experimentDispatchers.completedTrial(trialLength);
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
