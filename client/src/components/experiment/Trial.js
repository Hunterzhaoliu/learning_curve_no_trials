import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import "./trial.css";
import background from "../../images/background.png";
import egg_platform from "../../images/egg_platform.png";
import egg from "../../images/egg.png";

class Trial extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0,
      platformHeight: 0,
      eggAnimation: "none",
      eggFalling: false,
      eggFell: false
    };
  }

  onChange = e => {
    if (this.state.eggAnimation === "none") {
      this.setState({ eggAnimation: "shake 0.5s infinite" });
    }
    this.setState({ eggHeight: e.target.value });
    this.setState({ platformHeight: e.target.value });
  };

  onChangeEnd = () => {
    this.setState({ eggAnimation: "none" });
  };

  componentDidUpdate() {
    const { eggFallPercentage } = this.props;
    // Animation details: https://www.w3schools.com/css/css3_animations.asp

    if (
      this.state.eggAnimation !== "fall 2.0s ease-in 1 forwards" &&
      this.state.eggFalling &&
      !this.state.eggFell
    ) {
      this.setState({ eggAnimation: "fall 2.0s ease-in 1 forwards" });

      // play audio
      const markTrialAudio = document.getElementById("markTrialAudio");
      setTimeout(function() {
        markTrialAudio.play();
      }, 1000);

      setTimeout(() => {
        // need to remove the egg or else it will make the page longer
        document.getElementById("egg").style.display = "none";
        this.setState({ eggFell: true });
      }, 2000);

      // mark location

      // this.props.completedTrial();
      // // reset state
      // this.setState({
      //   eggHeight: 0,
      //   platformHeight: 0,
      //   eggAnimation: "none",
      //   eggFalling: false
      // });
    } else if (
      !this.state.eggFalling &&
      this.state.eggHeight > eggFallPercentage
    ) {
      // egg needs to fall
      this.setState({ eggFalling: true });
    }
  }

  render() {
    const { windowWidth, windowHeight } = this.props;

    // percentage of top padding for the ladder
    const sliderTopPercent = 11;
    // percentage of windowHeight to bottom of ladder
    const screenPercentLadderBottom = 83;
    const ladderHeight =
      (screenPercentLadderBottom - sliderTopPercent) * 0.01 * windowHeight;

    const eggPlatformWidth = 150;
    const eggPlatformHeight = 20;

    document.documentElement.style.setProperty(
      "--ladder-top",
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

    // amount of top padding within the slider div
    const platformTop =
      (1 - this.state.eggHeight * 0.01) * ladderHeight - eggPlatformHeight / 2;

    const eggHeight = 75;
    const eggWidth = 57;
    const eggTop = platformTop - eggHeight;
    const eggLeft = (eggPlatformWidth - eggWidth) / 2;

    return (
      <div>
        <img className="img-background" src={background} alt="" />
        <div style={{ left: sliderLeft }} className="slider-container">
          <input
            onChange={this.onChange}
            type="range"
            min="1"
            max="100"
            value={this.state.eggHeight}
            className="slider"
            id="eggHeight"
            onMouseUp={this.onChangeEnd}
            onTouchEnd={this.onChangeEnd}
            disabled={this.state.eggFalling}
          />
          <img
            style={{ top: platformTop }}
            className="img-egg-platform"
            src={egg_platform}
            alt=""
          />
          <img
            style={{
              height: String(eggHeight) + "px",
              top: eggTop,
              left: eggLeft,
              animation: this.state.eggAnimation
            }}
            className="img-egg"
            id="egg"
            src={egg}
            alt=""
          />
        </div>
        <Markers />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    windowHeight: state.initialize.windowHeight
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
