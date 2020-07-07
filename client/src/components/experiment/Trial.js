import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Guess from "./Guess";
import Markers from "./Markers";
import "./trial.css";
import background from "../../images/background.png";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";
import startTrialAudio from "../../audio/bell.mp3";

class Trial extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0,
      eggAnimation: "none",
      eggFalling: false,
      eggFell: false,
      hasGuessed: false
    };
  }

  onChange = e => {
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
    const { guesses, trial, eggFallPercentage } = this.props;
    if (!this.state.hasGuessed && trial === guesses.length) {
      this.setState({ hasGuessed: true });
      const startTrialAudio = document.getElementById("startTrialAudio");
      setTimeout(function() {
        startTrialAudio.play();
      }, 1000);
    }

    if (this.state.eggFalling && !this.state.eggFell) {
      const markTrialAudio = document.getElementById("markTrialAudio");
      setTimeout(function() {
        markTrialAudio.play();
      }, 1000);

      setTimeout(() => {
        // need to remove the egg or else it will make the page longer
        document.getElementById("egg").style.display = "none";
        this.setState({ eggFalling: false, eggFell: true });
        this.props.completedTrial();
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
          hasGuessed: false
        });

        // in Guess component, the make guess audio is played in componentDidMount
        // which won't run again for the next trial, so need to start audio here
        const makeGuessAudio = document.getElementById("makeGuessAudio");
        makeGuessAudio.play();
      }, 3000);
    } else if (
      this.state.eggHeight > eggFallPercentage &&
      !this.state.eggFalling &&
      !this.state.eggFell
    ) {
      // egg needs to fall
      this.setState({
        eggFalling: true,
        eggAnimation: "fall 2.0s ease-in 1 forwards"
      });
    }
  }

  render() {
    const { windowWidth, windowHeight } = this.props;
    // slider and ladder should be in very similar positions
    // percent of windowHeight to top of ladder
    const sliderTopPercent = 11;
    // percent of windowHeight to bottom of ladder
    const screenToLadderBottomPercent = 83;
    // const ladderHeight = screenToLadderBottomPercent - sliderTopPercent;
    const ladderHeight =
      (screenToLadderBottomPercent - sliderTopPercent) * 0.01 * windowHeight;

    const eggPlatformWidth = 125;
    const eggPlatformHeight = 20;

    document.documentElement.style.setProperty(
      "--slider-top-percent",
      String(sliderTopPercent) + "%"
    );
    document.documentElement.style.setProperty(
      "--ladder-height",
      String(ladderHeight) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-width",
      String(eggPlatformWidth) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-height",
      String(eggPlatformHeight) + "px"
    );

    const sliderLeft = (windowWidth - eggPlatformWidth) / 2;

    const platformTop =
      (1 - this.state.eggHeight * 0.01) * ladderHeight - eggPlatformHeight / 2;

    const eggHeight = 75;
    const eggWidth = 57;

    const eggTop = platformTop - eggHeight;
    const eggLeft = (eggPlatformWidth - eggWidth) / 2;

    const isEggSliderDisabled =
      !this.state.hasGuessed || this.state.eggFalling || this.state.eggFell;
    return (
      <div>
        <audio id="startTrialAudio">
          <source src={startTrialAudio} type="audio/mpeg" />
        </audio>
        <img className="img-background" src={background} alt="" />
        <Guess
          ladderWidth={eggPlatformWidth}
          hasGuessed={this.state.hasGuessed}
        />
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
              height: eggHeight,
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    windowHeight: state.initialize.windowHeight,
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
    completedTrial: userCode => {
      experimentDispatchers.completedTrial(userCode);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trial);